import { Route } from '@angular/router';

export const ROUTES: Route[] = [
  { path: 'courses', loadChildren: './course-list/course-list.module#CourseListModule' },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
];
