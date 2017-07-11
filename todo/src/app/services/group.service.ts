import {Injectable} from '@angular/core';
import {Group} from '../models/Group';
import {Task} from '../models/Task';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GroupService {
  groupsUrl = 'api/groups';
  tasksUrl = 'api/tasks';

  constructor(private http: Http) {
  }

  getGroups(): Promise<Group[]> {
    let groups: Group[] = [];
    return this.http.get(this.groupsUrl)
      .toPromise()
      .then(response => response.json().data.forEach(
        (g: Group) => groups.push(new Group(g.id, g.title))))
      .then(() => Promise.resolve(groups))
      .catch(this.handleError);
  }

  getGroup(id: number): Promise<Group> {
    let url = `${this.groupsUrl}/${id}`;
    let group: Group;
    return this.http.get(url)
      .toPromise()
      .then(res => {
        let data = res.json().data;
        group = new Group(data.id, data.title);
      })
      .then(() => Promise.resolve(group))
      .catch(this.handleError);
  }

  createGroup(title: string): Promise<Group> {
    return this.http
      .post(this.groupsUrl, JSON.stringify({title: title, tasks: []}))
      .toPromise()
      .then(res => res.json().data as Group)
      .catch(this.handleError);
  }

  updateGroup(group: Group): Promise<Group> {
    let url = `${this.groupsUrl}/${group.id}`;
    return this.http
      .put(url, JSON.stringify(group))
      .toPromise()
      .then(() => group)
      .catch(this.handleError);
  }

  deleteGroup(id: number): Promise<Group> {
    const url = `${this.groupsUrl}/${id}`;
    return this.http
      .delete(url)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  deleteTask(id: number): Promise<Task> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http
      .delete(url)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  getTasksByGroupId(id: number): Promise<Task[]> {
    const url = `${this.tasksUrl}?groupId=${id}`;
    let tasks: Task[] = [];

    return this.http.get(url).toPromise()
      .then(res => res.json().data.forEach(
        (t: Task) => tasks.push(
          new Task(t.id, t.title, t.startDate, t.note, t.priority, t.groupId))))
      .then(() => Promise.resolve(tasks))
      .catch(this.handleError);
  }

  getTasksDistinct(): Promise<Task[]> {
    let tasks: Task[] = [];
    return this.http.get(this.tasksUrl)
      .toPromise()
      .then(response => response.json().data.forEach(
        (t: Task) => tasks.push(
          new Task(t.id, t.title, t.startDate, t.note, t.priority, t.groupId))))
      .then(() => Promise.resolve(tasks));
  }

  handleError(error: any): Promise<any> {
    console.log('error while geting data from api', error);
    return Promise.reject(error.message || error);
  }
}
