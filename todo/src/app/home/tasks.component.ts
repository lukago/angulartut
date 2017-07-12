import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {GroupService} from '../services/group.service';
import {Task} from '../models/Task';
import {Group} from '../models/Group';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit, OnChanges {
  @Input() tasks: Task[] = [];
  @Input() useDb = true;

  @Output() updated = new EventEmitter<boolean>();
  @Input() updateView: boolean;

  showAddMenu: boolean = false;
  groups: Group[] = [];

  constructor(private groupService: GroupService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (this.useDb) {
      this.tasks = [];
      this.groupService.getTasksDistinct()
        .then(tasks => this.tasks = tasks);
    }

    this.groupService.getGroups()
      .then(groups => this.groups = groups);
  }

  ngOnChanges(): void {
    this.ngOnInit();
  }

  gotoAddTask() {
    this.showAddMenu = true;
  }

  addTask(title: string, startDate: string,
          note: string, priority: number,
          gid: number) {
      this.showAddMenu = false;
      let task: Task;
      let id = Math.max(...this.tasks.map(t => t.id)) + 1;

      try {
        task = new Task(id, title, new Date(startDate), note, priority, gid);
      } catch (e) {
        console.log('Wrong input data');
        return;
      }

      this.groupService.createTask(task)
        .then(t => this.tasks.push(t));
  }

  deleteTask(task: Task): void {
    this.groupService
      .deleteTask(task.id)
      .then(() => this.tasks = this.tasks.filter(t => t !== task));
      // .then(() => this.updated.emit(true));
  }

  gotoTaskEditor(id: number) {
    this.router.navigate(['/tasks', id]);
  }
}
