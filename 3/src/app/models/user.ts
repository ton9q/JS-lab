import { Homework } from './homework';

export interface User {
  name: string;
  surname: string;
  listHomeworks: Homework[];
}
