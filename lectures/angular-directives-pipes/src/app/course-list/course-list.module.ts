import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseListItemComponent } from './components/course-list-item/course-list-item.component';

import { RouterModule } from '@angular/router';
import { routes } from './course-list.routes';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material';
import { MinutesToTimePipe } from './pipes/minutes-to-time.pipe';
import { CreationDateStatusDirective } from './directives/creation-date-status.directive';
import { FilterByPipe } from './pipes/filter-by.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    CourseListComponent,
    CourseListItemComponent,
    MinutesToTimePipe,
    CreationDateStatusDirective,
    FilterByPipe,
    OrderByPipe,
    ConfirmationDialogComponent
  ],
  providers: [
    FilterByPipe
  ],
  entryComponents: [ConfirmationDialogComponent]
})
export class CourseListModule { }
