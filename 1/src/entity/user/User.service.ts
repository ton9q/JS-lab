import { HomeworkType } from '../homework/Homework.service';

export type UserType = {
  name: string;
  surname: string;
  listHomeworks: HomeworkType[];
}

export interface UserInterface {
  name: string;
  surname: string;
  listHomeworks: HomeworkType[];
}