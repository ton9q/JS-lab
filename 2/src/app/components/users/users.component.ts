import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/models/user';

import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
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

  unselectUser(){
    this.selectedUser = null;
  }
}
