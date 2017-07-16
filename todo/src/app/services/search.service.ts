import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Task} from '../models/task';

import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {

  constructor(private http: Http) {
  }

  search(term: string): Observable<Task[]> {
    let url = term ? `api/tasks?title=${term}` : 'api/tasks';

    return this.http
      .get(url)
      .map(resposne => this.toTaskArray(resposne.json().data));
  }

  private toTaskArray(array: any): Task[] {
    let tasks: Task[] = [];
    array.forEach((t: Task) => tasks.push(
        new Task(t.id, t.title, t.startDate,
          t.note, t.priority, t.groupId, t.status)))
    return tasks;
  }
}
