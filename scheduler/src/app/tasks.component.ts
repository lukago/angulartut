import {Component, OnInit} from '@angular/core';
import {TasksService} from './tasks.service';
import {Task} from './task';

@Component({
  selector: 'tasks-list',
  template: `
  <h2>All tasks list</h2>
  <ul class="tasks">
    <li *ngFor="let task of tasks">
      <span>{{task.description}} => {{task.time.getFullYear().toString()}}</span>
    </li>
  </ul>
  `,
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasksService.getTasks()
      .then(tasks => tasks.forEach(
        t => this.tasks.push(new Task(t.id, new Date(t.time), t.description, t.place))));
  }
}
