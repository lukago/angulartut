import {Component, Input, OnInit} from '@angular/core';
import {Task} from './task';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {TasksService} from './tasks.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'task-detail',
  template: `
    <div *ngIf="task">
      <h3>Task {{task.id}}</h3>
      <div>
        {{task.description}}, {{task.time}}
      </div>
      <input [(ngModel)]="task.description" placeholder="edit name...">
    </div>
  `
})
export class TaskDetailComponent implements OnInit {
  @Input() task: Task;

  constructor(
    private route: ActivatedRoute,
    private tasksService: TasksService
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.tasksService.getTask(+params.get('id')))
      .subscribe(task => this.task = task);
  }
}
