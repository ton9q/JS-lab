import { Course } from './../../models/course';
import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.scss']
})
export class CourseListItemComponent {
  @Input() course: Course;

  @Output() edit = new EventEmitter<Course>();
  @Output() remove = new EventEmitter<Course>();

  onEdit() {
    this.edit.emit(this.course);
  }

  onRemove() {
    this.remove.emit(this.course);
  }
}
