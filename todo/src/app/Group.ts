import {Task} from './Task';

export class Group {
  id: number;
  title: string;
  tasks: Task[];

  constructor(id: number, title: string, tasks: Task[]) {
    this.id = id;
    this.title = title;
    this.tasks = [];
    tasks.forEach(t => this.tasks.push(
      new Task(t.id, t.title, t.startDate, t.note, t.priority)));
  }
}
