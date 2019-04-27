import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

import { CourseResponse, Course } from './../models/course';
import { coursesMock } from './course.mock';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  getList(): Observable<CourseResponse> {
    return of({ ...coursesMock }); // fake response (like other or() statements)
  }

  createCourse(): void  {
    console.log('create course');
  }

  getItemById(id: number): Observable<Course> {
    return of(coursesMock.courses.find(course => course.id === id));
  }

  updateItem(course: Course): Observable<Course> {
    return of(course);
  }

  removeItem(course: Course): Observable<any> {
    coursesMock.courses = coursesMock.courses.filter(_course => _course.id !== course.id);

    return of({ id: course.id });
  }

  loadMoreCourses(): void {
    console.log('create course');
  }
}
