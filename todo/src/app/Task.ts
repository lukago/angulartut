export class Task {
  title: string;
  startDate: Date;
  note: string;
  priority: number;

  constructor(title: string, startDate: Date,
              note: string, priority: number) {
    this.title = title;
    this.startDate = new Date(startDate);
    this.note = note;
    this.priority = priority;
  }

  eqals(task: Task): boolean {
    if (this.startDate === task.startDate
      && this.title === task.title
      && this.note === task.note) {
      return true;
    }
    return false;
  }
}
