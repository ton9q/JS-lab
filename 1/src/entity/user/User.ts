import { v4 as uuid } from 'uuid';

import { HomeworkType } from '../homework/Homework.service';

class User {
  public name: string;
  public surname: string;
  public listHomeworks: HomeworkType[];
  private id: string;

  constructor(name: string, surname: string, listHomeworks: HomeworkType[] = []) {
    this.name = name;
    this.surname = surname;
    this.listHomeworks = [...listHomeworks];
    this.id = uuid();
  }

  public addHomeworkOnList(complitedHomework: HomeworkType): void {
    this.listHomeworks.push(complitedHomework);
  }

  public addHomeworksOnList(complitedHomeworks: HomeworkType[]): void {
    this.listHomeworks = [...this.listHomeworks, ...complitedHomeworks];
  }

  public toString(): string {
    const listHomeworks = this.listHomeworks
      .map(homework => {
        return homework.toString()
      })
      .join('\n');

    return `person: ${this.name} ${this.surname}, id: ${
      this.id}, \nlistHomeworks: \n${listHomeworks}`;
  }
}

export default User
