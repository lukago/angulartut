import {Component, OnInit} from '@angular/core';
import {TasksService} from './tasks.service';
import {Task} from './task';

@Component({
  selector: 'tasks-list',
  template: `
  <h1>All tasks list</h1>
  <ul class="tasks">
    <li *ngFor="let task of tasks" (click)="gotoDetail(task)">
      <span class="badge">{{task.id}}</span>
      <span>
        {{task.description}}, {{task.place}}, {{task.time.getFullYear()}}
      </span>
    </li>
  </ul>
  <task-detail [task]="selectedTask"></task-detail>
  `,
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  selectedTask: Task;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasksService.getTasks()
      .then(tasks => this.tasks = tasks);
  }

  gotoDetail(task: Task): void {
    this.selectedTask = task;
  }
}
