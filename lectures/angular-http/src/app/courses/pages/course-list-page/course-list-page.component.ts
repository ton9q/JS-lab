import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from '../../../courses/models/course';
import { CourseService } from '../../../courses/services/course.service';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';
import { Subject, Subscription, of } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list-page.component.html',
  styleUrls: ['./course-list-page.component.scss']
})
export class CourseListPageComponent implements OnInit {
  courses: Course[] = [];
  searchCriteria: string;

  isLoading = false;
  hasMoreCourses = true;
  currentPage = 0;

  private debounceSubject = new Subject<string>();
  private subscription = new Subscription();

  constructor(private courseService: CourseService,
              private dialog: MatDialog,
              private router: Router) {}

  ngOnInit() {
    this.loadMoreCourses();

    this.debounceSubject
      .pipe(
        filter((value) => !value.length || value.length >= 3),
        debounceTime(1000)
      ).subscribe((searchCriteria) => {
        this.reloadCourses(searchCriteria);
      });
  }

  loadMoreCourses(searchCriteria?: string) {
    if (!this.isLoading) {
      this.isLoading = true;

      this.subscription.add(
        this.courseService.getList(this.currentPage, searchCriteria).subscribe(({ courses, hasMoreCourses }) => {
          this.courses = this.courses.concat(courses);

          this.hasMoreCourses = hasMoreCourses;

          this.isLoading = false;
          this.currentPage++;
        }, (error) => console.log('error was handled', error))
      );
    }
  }

  reloadCourses(searchCriteria?: string) {
    this.currentPage = 0;
    this.courses = [];
    this.loadMoreCourses(searchCriteria);
  }

  editCourse(course: Course) {
    this.router.navigate(['courses', course.id]);
  }

  removeCourse(course: Course) {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '500px'
    }).afterClosed().subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.courseService.removeItem(course).subscribe(() => {
          this.reloadCourses();
        });
      }
    });
  }

  onSearchCriteriaChange(searchSriteria: string) {
    this.debounceSubject.next(searchSriteria);
  }
}
