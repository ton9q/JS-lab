import Homework from './entity/homework/Homework';
import User from './entity/user/User';

import { Status } from './entity/homework/Homework.service';
import { UserInterface } from './entity/user/User.service';

import { outputUsers, countUsersWithComplitedTasks } from './services/index';

const user1 = new User('Anton', 'Kuchma');
const user2 = new User('Maksim', 'Kuchma');
const user3 = new User('Alexandra', 'Rudenya');

const homework1 = new Homework('title1', 'task1', Status.Completed);
const homework2 = new Homework('title2', 'task2', Status.NotCompleted);
const homework3 = new Homework('title3', 'task3', Status.NotCompleted);
const homework4 = new Homework('title4', 'task4', Status.Completed);
const homework5 = new Homework('title5', 'task5', Status.Completed);

user1.addHomeworksOnList([homework1, homework4, homework5]);
user2.addHomeworksOnList([homework1, homework2, homework3, homework4, homework5]);
user3.addHomeworksOnList([homework1, homework3, homework4, homework5]);

const users = [user1, user2, user3]
const listUsersWithTasks = outputUsers<UserInterface>(users);
const numberUsersWithComplitedTasks = countUsersWithComplitedTasks<UserInterface>(users);

console.log(listUsersWithTasks);
console.log(`numberUsersWithComplitedTasks: ${numberUsersWithComplitedTasks}`);