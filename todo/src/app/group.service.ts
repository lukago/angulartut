import {Injectable} from '@angular/core';
import {Group} from './Group';
import {Task} from './Task';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GroupService {
  groupsUrl = 'api/groups';
  tasksUrl = 'api/tasksarr';

  constructor(private http: Http) { }

  getGroups(): Promise<Group[]> {
    let groups: Group[] = [];
    return this.http.get(this.groupsUrl)
      .toPromise()
      .then(response => response.json().data.forEach(
        (g: Group) => groups.push(new Group(g.id, g.title, g.tasks))))
      .then(() => Promise.resolve(groups))
      .catch(this.handleError);
  }

  createGroup(title: string): Promise<Group> {
    return this.http
      .post(this.groupsUrl, JSON.stringify({title: title, tasks: []}))
      .toPromise()
      .then(res => res.json().data as Group)
      .catch(this.handleError);
  }

  getTasksDistinct(): Promise<Task[]> {
    let tasks: Task[] = [];
    return this.http.get(this.tasksUrl)
      .toPromise()
      .then(response => response.json().data.forEach(
        (t: Task) => tasks.push(new Task(t.id, t.title, t.startDate, t.note, t.priority))))
      .then(() => Promise.resolve(tasks));
  }

  handleError(error: any): Promise<any> {
    console.log('error while geting data from api', error);
    return Promise.reject(error.message || error);
  }
}
