import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { User } from 'src/app/models/user';

import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {
  users: User[];
  selectedUser: User = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users = this.userService.getUsers();
  }

  onSelect(user: User): void {
    this.selectedUser = user;
    console.log(this.selectedUser);
  }

  unselectUser(): void {
    this.selectedUser = null;
  }

  get runChangeDetection(): string {
    console.log('check changes');
    return 'runChangeDetection';
  }

  changeDetection(): void {
    for (let i = 0; i < this.users.length; i++) {
      setTimeout(() => {
        this.selectedUser = this.users[i];
        console.log('change on user: ', this.users[i]);
      }, i * 1000);
    }
  }
}
