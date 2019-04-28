import { Injectable } from '@angular/core';

import { User } from 'src/app/models/user';
import { Homework } from 'src/app/models/homework';
import { Status } from 'src/app/models/status';

import { DataHomeworksService } from '../data/dataHomeworks.service';
import { DataUsersService } from '../data/dataUsers.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[];
  homeworks: Homework[];

  constructor(
    private dataHomeworksService: DataHomeworksService,
    private dataUsersServise: DataUsersService
  ) {
    this.generateUsersWithTasks();
  }

  private generateUsersWithTasks() {
    this.users = this.dataUsersServise.getUsers();
    this.homeworks = this.dataHomeworksService.getHomeworks();

    this.users[0].listHomeworks = [this.homeworks[0], this.homeworks[3], this.homeworks[4]];
    this.users[1].listHomeworks = [this.homeworks[0], this.homeworks[1], this.homeworks[2], this.homeworks[3], this.homeworks[4]];
    this.users[2].listHomeworks = [this.homeworks[0], this.homeworks[2], this.homeworks[3], this.homeworks[4]];
  }

  getUsers(): User[] {
    return this.users;
  }

  getFullName(user: User): string {
    return `${user.name} ${user.surname}`;
  }

  checkHomeworks(user: User): boolean {
    return user.listHomeworks.every(homework => homework.status === Status.Completed);
  }
}
