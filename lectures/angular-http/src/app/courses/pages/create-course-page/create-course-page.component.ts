import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';

@Component({
  selector: 'app-create-course-page',
  templateUrl: './create-course-page.component.html',
  styleUrls: ['./create-course-page.component.scss']
})
export class CreateCoursePageComponent {
  constructor(private courseService: CourseService, private router: Router) { }

  onSubmit(course: Course) {
    this.courseService.createCourse(course).subscribe(() => {
      this.navigateHome();
    });
  }

  navigateHome() {
    this.router.navigate(['/']);
  }
}
