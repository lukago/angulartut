export class Task {
  id: number;
  title: string;
  startDate: Date;
  note: string;
  priority: number;
  groupId: number;

  constructor(id: number, title: string, startDate: Date,
              note: string, priority: number, groupId: number) {
    this.id = id;
    this.title = title;
    this.startDate = new Date(startDate);
    this.note = note;
    this.priority = priority;
    this.groupId = groupId;
  }

  equals(task: Task): boolean {
    if (this.startDate.getTime() === task.startDate.getTime()
      && this.title === task.title
      && this.note === task.note) {
      return true;
    }
    return false;
  }
}