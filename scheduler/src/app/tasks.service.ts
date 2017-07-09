import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Task} from './task';

@Injectable()
export class TasksService {
  apiUrl = 'api/tasks';
  tasks: Task[];

  constructor(private http: Http) {}

  getTasks(refresh?: boolean): Promise<Task[]> {

    if (refresh || !this.tasks) {
      this.tasks = [];
      return this.http.get(this.apiUrl)
        .toPromise()
        .then(response => response.json().data.forEach(
          (t: Task) => this.tasks.push(new Task(t.id, t.time, t.description, t.place))))
        .then(() => Promise.resolve(this.tasks))
        .catch(this.handleError);
    } else {
      return Promise.resolve(this.tasks);
    }
  }

  getTask(id: number): Promise<Task> {
    return this.getTasks()
      .then(tasks => tasks.find(t => t.id === id))
      .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    console.log('error while geting data from WebAPI', error);
    return Promise.reject(error.message || error);
  }
}
