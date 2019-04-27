import { CourseResponse } from './../models/course';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { map, retry, catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Course } from '../models/course';

@Injectable()
export class CourseService {
  private readonly COURSES_URL = 'courses';
  private readonly LIMIT = 10;

  constructor(private http: HttpClient) {}

  getList(page: number = 0, searchCriteria?: string): Observable<CourseResponse> {
    const params = new HttpParams()
      .set('start', (page * this.LIMIT).toString())
      .set('count', (this.LIMIT).toString())
      .set('textFragment', searchCriteria || '');

    const headers = new HttpHeaders()
      .set('api-version', '2');

    return this.http.get<Course[]>(this.COURSES_URL, { params, headers })
      .pipe(
        retry(4),
        catchError(this.handleError),
        tap(() => console.log('the flow was continued')),
        map((courses) => ({ courses, hasMoreCourses: courses.length === this.LIMIT }))
      );
  }

  createCourse(course: Course): Observable<Course>  {
    return this.http.post<Course>(this.COURSES_URL, course);
  }

  getItemById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.COURSES_URL}/${id}`);
  }

  updateItem(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.COURSES_URL}/${course.id}`, course);
  }

  removeItem(course: Course): Observable<any> {
    return this.http.delete(`${this.COURSES_URL}/${course.id}`);
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.log(error);
    return of([]);
  }
}
