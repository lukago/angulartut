import {Component, OnInit} from '@angular/core';
import {Task} from './task';
import {TasksService} from './tasks.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  tasksDs: Task[] = [];

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    this.tasksService.getTasks()
      .then(tasks => this.tasksDs = this.sliceTasks(tasks))
      .then(() => this.sortHandler());
  }

  private sliceTasks(tasks: Task[]) {
    return tasks
      .sort((a, b) => a.time.getTime() - b.time.getTime())
      .filter(task => task.time.getTime() > Date.now())
      .slice(0, 2);
  }

  private sortHandler(): void {
    console.log('todo');
  }
}
