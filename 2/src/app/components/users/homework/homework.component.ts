import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import { UserService } from 'src/app/services/user/user.service';

import { User } from 'src/app/models/user';
import { Status } from 'src/app/models/status';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.css']
})
export class HomeworkComponent implements OnInit {
  @Input() user: User;
  @Output() unselect = new EventEmitter<User>();

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  unselectUser(): void  {
    this.unselect.emit();
  }

  checkStatus(status: Status): boolean {
    return status === Status.Completed;
  }
}
