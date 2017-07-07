export class Task {
  id: number;
  time: Date;
  description: string;
  place: string;

  constructor(id: number, time: Date, description: string, place: string) {
    this.id = id;
    this.time = time;
    this.description = description;
    this.place = place;
  }
}
