import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Task} from './task';

@Injectable()
export class TasksService {
  apiUrl = 'api/tasks';

  constructor(private http: Http) {}

  getTasks(): Promise<Task[]> {
    return this.http.get(this.apiUrl)
      .toPromise()
      .then(response => response.json().data as Task[])
      .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    console.log('error while geting data from WebAPI', error);
    return Promise.reject(error.message || error);
  }
}
