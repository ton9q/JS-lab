import { Injectable } from '@angular/core';

import { Homework } from 'src/app/models/homework';
import { Status } from 'src/app/models/status';

@Injectable({
  providedIn: 'root'
})
export class DataHomeworksService {
  private homeworks: Homework[] = [
    {
      topicTitle: 'title1',
      task: 'task1',
      status: Status.Completed
    },
    {
      topicTitle: 'title2',
      task: 'task2',
      status: Status.NotCompleted
    },
    {
      topicTitle: 'title3',
      task: 'task3',
      status: Status.NotCompleted
    },
    {
      topicTitle: 'title4',
      task: 'task4',
      status: Status.Completed
    },
    {
      topicTitle: 'title5',
      task: 'task5',
      status: Status.Completed
    },
  ];

  constructor() { }

  getHomeworks() {
    return this.homeworks;
  }
}
