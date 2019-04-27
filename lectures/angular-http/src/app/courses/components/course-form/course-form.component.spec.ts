import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFormComponent } from './course-form.component';
import {
  MatCardModule,
  MatChipsModule,
  MatInputModule,
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MinutesToTimePipe } from '../../pipes/minutes-to-time.pipe';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CourseFormComponent', () => {
  let component: CourseFormComponent;
  let fixture: ComponentFixture<CourseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CourseFormComponent,
        MinutesToTimePipe,
      ],
      imports: [
        NoopAnimationsModule,
        MatCardModule,
        MatChipsModule,
        MatInputModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FormsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
