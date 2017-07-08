import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Task} from './task';

@Injectable()
export class TasksService {
  apiUrl = 'api/tasks';

  constructor(private http: Http) {}

  getTasks(): Promise<Task[]> {
    let tasks: Task[] = [];

    return this.http.get(this.apiUrl)
      .toPromise()
      .then(response => response.json().data.forEach(
        (t: Task) => tasks.push(new Task(t.id, t.time, t.description, t.place))))
      .then(() => Promise.resolve(tasks))
      .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    console.log('error while geting data from WebAPI', error);
    return Promise.reject(error.message || error);
  }
}
