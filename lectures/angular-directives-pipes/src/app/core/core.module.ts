import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CourseListModule } from '../course-list/course-list.module';
import { LogoComponent } from './components/logo/logo.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  LogoComponent,
  BreadcrumbsComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  declarations: [
    ...COMPONENTS,
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class CoreModule { }
