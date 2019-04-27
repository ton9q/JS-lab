import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { CourseListPageComponent } from './course-list-page.component';
import { CourseService } from '../../../courses/services/course.service';
import { Course, CourseResponse } from '../../../courses/models/course';
import { OrderByPipe } from '../../../courses/pipes/order-by.pipe';
import { FilterByPipe } from '../../../courses/pipes/filter-by.pipe';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

const mockCourse = {
  id: 1,
  name: 'Title 1',
  date: '2018-05-09',
  length: 34,
  description: 'Description 1'
};

@Component({
  selector: 'app-course-item',
  template: `
    <h1 class="title-stub">{{ course.name }}</h1>
    <button class="edit-stub" (click)="edit.emit(course)"></button>
    <button class="remove-stub" (click)="remove.emit(course)"></button>
  `
})
class CourseItemStubComponent {
  @Input() course: Course;
  @Output() edit = new EventEmitter<Course>();
  @Output() remove = new EventEmitter<Course>();
}

describe('CourseListPageComponent', () => {
  let component: CourseListPageComponent;
  let fixture: ComponentFixture<CourseListPageComponent>;
  let mockService;
  let mockBreadcrumbsService;
  let mockRouter;
  let mockActivatedRoute;
  let mockDialog;

  const mockCourses: CourseResponse = {
    courses: [
      {
        id: 1,
        name: 'Title 1',
        date: '2018-05-09',
        length: 34,
        description: 'Description 1'
      },
      {
        id: 2,
        name: 'Title 2',
        date: '2018-05-10',
        length: 35,
        description: 'Description 2'
      }
    ],
    hasMoreCourses: true
  };

  beforeEach(async(() => {
    mockService = {
      getList: jasmine.createSpy('getCourses').and.returnValue(of({...mockCourses})),
      createCourse: jasmine.createSpy('updateItem'),
      updateItem: jasmine.createSpy('updateItem'),
      removeItem: jasmine.createSpy('removeItem').and.returnValue(of({})),
    };

    mockBreadcrumbsService = {
      segments$: of([]),
      updateSegments: jasmine.createSpy('updateSegments')
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    mockActivatedRoute = {
      snapshot: {
        parent: {
          data: { breadcrumb: { name: 'Courses', url: '/courses' } }
        }
      }
    };

    mockDialog = {
      open: jasmine.createSpy('dialog.open').and.returnValue({ afterClosed: () => of(true) })
    };

    TestBed.configureTestingModule({
      declarations: [
        CourseListPageComponent,
        CourseItemStubComponent,
        OrderByPipe,
        FilterByPipe,
      ],
      imports: [
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        FormsModule,
        NoopAnimationsModule
      ],
      providers: [
        FilterByPipe,
        { provide: CourseService, useValue: mockService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: MatDialog, useValue: mockDialog }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should retrieve courses list', () => {
      expect(mockService.getList).toHaveBeenCalled();
    });

    it('should save courses data', () => {
      expect(component.courses).toEqual(mockCourses.courses);
      expect(component.hasMoreCourses).toEqual(mockCourses.hasMoreCourses);
    });
  });

  it('should render course items', () => {
    const items = fixture.debugElement.queryAll(By.css('app-course-item'));
    expect(items.length).toEqual(mockCourses.courses.length);
  });

  it('should not show load more button if there is no more results', () => {
    component.hasMoreCourses = false;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.course-list__load-more'));
    expect(button).toBeFalsy();
  });

  it('should show load more button if there are more results available', () => {
    component.hasMoreCourses = true;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.course-list__load-more'));
    expect(button).toBeTruthy();
    expect(button.nativeElement.innerText).toEqual('Load more');
  });

  describe('#filter', () => {
    it('should search courses', fakeAsync(() => {
      component.onSearchCriteriaChange('Title 1');
      tick(1000);
      expect(mockService.getList).toHaveBeenCalledWith(0, 'Title 1');
    }));
  });

  describe('#loadMore', () => {
    it('should load more courses', () => {
      const button = fixture.debugElement.query(By.css('.course-list__load-more'));
      button.triggerEventHandler('click', null);
      expect(mockService.getList).toHaveBeenCalled();
    });
  });

  describe('#editCourse', () => {
    it('should edit course', () => {
      const stubTrigger = fixture.debugElement.query(By.css('.edit-stub'));
      stubTrigger.triggerEventHandler('click', null);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['courses', mockCourses.courses[0].id]);
    });
  });

  describe('#removeCourse', () => {
    it('should remove course', () => {
      const stubTrigger = fixture.debugElement.query(By.css('.remove-stub'));
      spyOn(component, 'reloadCourses');
      stubTrigger.triggerEventHandler('click', null);
      expect(mockService.removeItem).toHaveBeenCalledWith(mockCourse);
      expect(component.reloadCourses).toHaveBeenCalled();
    });

    it('should do nothing if modal is not confirmed', () => {
      const stubTrigger = fixture.debugElement.query(By.css('.remove-stub'));
      mockDialog.open.and.returnValue({ afterClosed: () => of(false) });
      spyOn(component, 'reloadCourses');
      stubTrigger.triggerEventHandler('click', null);
      expect(mockService.removeItem).not.toHaveBeenCalled();
      expect(component.reloadCourses).not.toHaveBeenCalled();
    });
  });
});
