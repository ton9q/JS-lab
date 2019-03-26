export enum Status {
  NotCompleted,
  Completed,
};

export type HomeworkType = {
  topicTitle: string;
  task: string;
  status: Status;
};