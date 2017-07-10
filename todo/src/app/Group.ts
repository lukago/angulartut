import {Task} from './Task';

export class Group {
  title: string;
  tasks: Task[];

  constructor(title: string, tasks: Task[]) {
    this.title = title;
    this.tasks = [];
    tasks.forEach(t => this.tasks.push(
      new Task(t.title, t.startDate, t.note, t.priority)));
  }
}
