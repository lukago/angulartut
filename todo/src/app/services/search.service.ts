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
    return this.http
      .get(`api/tasks?title=${term}`)
      .map(resposne => resposne.json().data as Task[]);
  }
}
