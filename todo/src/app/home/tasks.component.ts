import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {GroupService} from '../services/group.service';
import {Task} from '../models/Task';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit, OnChanges {
  @Input() tasks: Task[] = [];
  @Input() useDb = true;

  @Output() updated = new EventEmitter<boolean>();
  @Input() updateView: boolean;

  constructor(
    private groupService: GroupService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.useDb) {
      this.tasks = [];
      this.groupService.getTasksDistinct()
        .then(tasks => this.tasks = tasks);
    }
  }

  ngOnChanges(): void {
    this.ngOnInit();
  }

  gotoAddTask() {
    this.router.navigateByUrl('/add-group');
  }

  deleteTask(task: Task): void {
    this.groupService
      .deleteTask(task.id)
      .then(() => this.tasks = this.tasks.filter(t => t !== task))
      .then(() => this.updated.emit(true));
  }
}
