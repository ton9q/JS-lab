import { Subject } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';

import { BreadcrumbsComponent } from './breadcrumbs.component';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;

  const mockActivatedRoute = {
    snapshot: {
      firstChild: {}
    }
  };

  const mockRouter = {
    events: new Subject()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreadcrumbsComponent ],
      imports: [ RouterTestingModule, MatToolbarModule ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should be empty in case of no segments', () => {
    const segments = fixture.debugElement.queryAll(By.css('.breadcrumbs__item'));
    const separators = fixture.debugElement.queryAll(By.css('.breadcrumbs__item__separator'));
    expect(segments.length).toEqual(0);
    expect(separators.length).toEqual(0);
  });
});
