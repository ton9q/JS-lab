import { Injectable } from '@angular/core';

import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class DataUsersService {
  private users: User[] = [
    {
      name: 'Anton',
      surname: 'Kuchma',
      listHomeworks: []
    },
    {
      name: 'Maksim',
      surname: 'Kuchma',
      listHomeworks: []
    },
    {
      name: 'Alexandra',
      surname: 'Rudenya',
      listHomeworks: []
    }
  ];

  constructor() { }

  getUsers() {
    return this.users;
  }
}
