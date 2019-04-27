import { AuthService } from 'src/app/auth/services/auth.service';
import { CourseService } from './../../services/course.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../models/course';

@Component({
  selector: 'app-edit-course-page',
  templateUrl: './edit-course-page.component.html',
  styleUrls: ['./edit-course-page.component.scss']
})
export class EditCoursePageComponent implements OnInit {
  course: Course;

  constructor(private courseService: CourseService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.course = this.route.snapshot.data['course'];
  }

  onSubmit(course: Course) {
    this.courseService.updateItem(course).subscribe(() => {
      this.navigateHome();
    });
  }

  navigateHome() {
    this.router.navigate(['/']);
  }

}
