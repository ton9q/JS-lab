import { Status } from './Homework.service';

class Homework {
  public topicTitle: string;
  public task: string;
  public status: Status;

  constructor(topicTitle: string, task: string, status: Status) {
    this.topicTitle = topicTitle;
    this.task = task;
    this.status = status;
  }

  public toString(): string {
    return `title: ${this.topicTitle}, task: ${this.task}, status: ${this.status}`;
  }
}

export default Homework;
