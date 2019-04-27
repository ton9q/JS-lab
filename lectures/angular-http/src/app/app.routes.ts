import { AuthGuard } from './auth/guards/auth.guard';
import { Route } from '@angular/router';
import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component';

export const ROUTES: Route[] = [
  {
    path: 'courses',
    loadChildren: './courses/courses.module#CoursesModule',
    canLoad: [ AuthGuard ],
    canActivate: [ AuthGuard ],
    data: {
      breadcrumb: { name: 'Courses', url: '/courses' }
    }
  },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent }
];
