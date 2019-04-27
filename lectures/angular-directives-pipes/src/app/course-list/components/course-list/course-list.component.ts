import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';
import { FilterByPipe } from '../../pipes/filter-by.pipe';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  courses: Course[];
  filteredCourses: Course[];
  hasMoreCourses: boolean;
  searchCriteria: string;

  constructor(private courseService: CourseService, private filterByPipe: FilterByPipe<Course>, private dialog: MatDialog) {}

  ngOnInit() {
    this.courseService.getList().subscribe(({ courses, hasMoreCourses }) => {
      this.courses = courses;
      this.hasMoreCourses = hasMoreCourses;
      this.filter();
    });
  }

  filter() {
    this.filteredCourses = this.filterByPipe.transform(this.courses, 'title', this.searchCriteria);
  }

  addCourse() {
    this.courseService.createCourse();
  }

  loadMore() {
    this.courseService.loadMoreCourses();
  }

  editCourse(course: Course) {
    this.courseService.updateItem(course).subscribe((updatedCourse) => {
      console.log('edit course', updatedCourse);
    });
  }

  removeCourse(course: Course) {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '500px'
    }).afterClosed().subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.courseService.removeItem(course).subscribe(({ id }) => {
          this.courses = this.courses.filter(_course => _course.id !== id);
          this.filter();
        });
      }
    });
  }
}
