import {Injectable} from '@angular/core';
import {Group} from '../models/group';
import {Task} from '../models/task';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class GroupService {
  private groupsUrl = 'http://localhost:8080/api/groups';
  private tasksUrl = 'http://localhost:8080/api/tasks';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  getGroups(): Promise<Group[]> {
    return this.http.get(this.groupsUrl)
      .toPromise()
      .then(response => response.json().groups as Group[])
      .catch(this.handleError);
  }

  getGroup(id: number): Promise<Group> {
    let url = `${this.groupsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(res => res.json().group as Group)
      .catch(this.handleError);
  }

  createGroup(title: string): Promise<Group> {
    return this.http
      .post(this.groupsUrl, JSON.stringify({title: title, tasks: []}),
        {headers: this.headers})
      .toPromise()
      .then(res => new Group(res.json().id, title))
      .catch(this.handleError);
  }

  createTask(tasks: Task[], title: string,
             date: Date, note: string,
             priority: number, gid: number,
             status: boolean): Promise<Task> {

    let id = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 0;
    let task = new Task(id, title, date, note, priority, gid, status);

    return this.http
      .post(this.tasksUrl, JSON.stringify(task), {headers: this.headers})
      .toPromise()
      .then(res => new Task(res.json().id, title,
          date, note, priority, gid, status));
  }

  updateTask(task: Task): Promise<Task> {
    let url = `${this.tasksUrl}/${task.id}`;
    return this.http
      .put(url, JSON.stringify(task), {headers: this.headers})
      .toPromise()
      .then(() => task)
      .catch(this.handleError);
  }

  updateGroup(group: Group): Promise<Group> {
    let url = `${this.groupsUrl}/${group.id}`;
    return this.http
      .put(url, JSON.stringify(group), {headers: this.headers})
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

    return this.http.get(url)
      .toPromise()
      .then(res => this.toTaskArray(res.json()))
      .catch(this.handleError);
  }

  getTasksDistinct(): Promise<Task[]> {
    return this.http.get(this.tasksUrl)
      .toPromise()
      .then(response => this.toTaskArray(response.json()))
      .catch(this.handleError);
  }

  getTask(id: number): Promise<Task> {
    let url = `${this.tasksUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(res => this.toTask(res.json().task))
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log('error while getting data from api', error);
    return Promise.reject(error.message || error);
  }

  private toTaskArray(array: any): Task[] {
    let arrayTasks = array.tasks;
    let tasks: Task[] = [];
    arrayTasks.forEach((t: Task) => tasks.push(this.toTask(t)));
    return tasks;
  }

  private toTask(t: Task): Task {
    return new Task(t.id, t.title, t.startDate,
      t.note, t.priority, t.groupId, t.status);
  }
}
