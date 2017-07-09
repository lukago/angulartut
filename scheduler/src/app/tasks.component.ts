import {Component, OnInit} from '@angular/core';
import {TasksService} from './tasks.service';
import {Task} from './task';
import {Router} from '@angular/router';

@Component({
  selector: 'tasks-list',
  template: `
  <h1>All tasks list</h1>
  <ul class="tasks">
    <li *ngFor="let task of tasks" (click)="select(task)">
      <span class="badge">{{task.id}}</span>
      <span>
        {{task.description}}, {{task.place}}, {{task.time.getFullYear()}}
      </span>
    </li>
  </ul>
  <div *ngIf="selectedTask">
    <button (click)="gotoDetail()">{{selectedTask.id}} details</button>
  </div>
  `,
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  selectedTask: Task;

  constructor(
    private tasksService: TasksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tasksService.getTasks()
      .then(tasks => this.tasks = tasks);
  }

  select(task: Task) {
    this.selectedTask = task;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedTask.id]);
  }
}
