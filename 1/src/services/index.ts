import { UserInterface } from '../entity/user/User.service';
import { Status } from '../entity/homework/Homework.service';

export function outputUsers<User extends UserInterface>(users: User[]): string {
  return users
    .map((user, index) => {
      const listHomeworks = user.listHomeworks
        .map(homework => {
          return homework.toString();
        })
        .join('\n');
      return `User-${index}:\nname: ${user.name},\nlistHomeworks:\n${listHomeworks}\n`
    })
    .join('\n');
}

export function countUsersWithComplitedTasks<User extends UserInterface>(users: User[]): number {
  return users.filter(user => {
    return user.listHomeworks.every(homework => {
      return homework.status == Status.Completed
    });
  }).length;
}
