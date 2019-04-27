import { Routes } from '@angular/router';
import { CourseListPageComponent } from './pages/course-list-page/course-list-page.component';
import { CreateCoursePageComponent } from './pages/create-course-page/create-course-page.component';
import { EditCoursePageComponent } from './pages/edit-course-page/edit-course-page.component';
import { CourseResolver } from './resolvers/course.resolver';

export const routes: Routes = [
  {
    path: '',
    component: CourseListPageComponent,
  },
  {
    path: 'new',
    component: CreateCoursePageComponent,
    data: {
      breadcrumb: {
        name: 'Create'
      }
    }
  },
  {
    path: ':id',
    component: EditCoursePageComponent,
    resolve: {
      course: CourseResolver
    }
  }
];
