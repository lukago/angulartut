import {Component, Input} from '@angular/core';
import {Task} from './task';

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
export class TaskDetailComponent {
  @Input() task: Task;
}
