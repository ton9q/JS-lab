import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';

import { Course, CourseAuthor } from '../../models/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @Input() course: Course = {
    name: null,
    date: null,
    length: null,
    description: null,
    authors: []
  };

  @Output() save = new EventEmitter<Course>();
  @Output() cancel = new EventEmitter();
  @ViewChild('courseForm') courseForm;

  addAuthor(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value.replace(/\s+/g, ' ');
    const fullName = value.split(' ').slice(0, 2);

    if (fullName.length >= 2) {
      this.course.authors.push({ firstName: fullName[0], lastName: fullName[1] });

      input.value = '';
    }
  }

  removeAuthor(author: CourseAuthor): void {
    const index = this.course.authors.indexOf(author);

    if (index >= 0) {
      this.course.authors.splice(index, 1);
    }
  }

  onSubmit(): void {
    this.save.emit(this.course);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

