import {Injectable} from '@angular/core';
import {Group} from './Group';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GroupService {
  apiUrl = 'api/groups';
  group: Group[] = [];

  constructor(private http: Http) { }

  getGroups(): Promise<Group[]> {
    return this.http.get(this.apiUrl)
      .toPromise()
      .then(response => response.json().data.forEach(
        (g: Group) => this.group.push(new Group(g.title, g.tasks))))
      .then(() => Promise.resolve(this.group))
      .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    console.log('error while geting data from api', error);
    return Promise.reject(error.message || error);
  }
}
