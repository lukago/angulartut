import {
  Component, EventEmitter, Input,
  OnChanges, OnInit, Output
} from '@angular/core';
import {Router} from '@angular/router';
import {GroupService} from '../services/group.service';
import {Task} from '../models/Task';
import {Group} from '../models/Group';
import {SortService} from '../services/sort.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  providers: [SortService, DatePipe]
})
export class TasksComponent implements OnInit, OnChanges {
  @Input() tasks: Task[] = [];
  @Input() groups: Group[] = [];
  @Input() useDb = true;

  @Output() updated = new EventEmitter<boolean>();
  @Input() updateView: boolean;

  showAddMenu = false;
  showWrongInputMsg = false;
  loaded = false;
  today: string;

  constructor(private groupService: GroupService,
              private router: Router,
              private sortService: SortService,
              private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    if (this.useDb) {
      this.tasks = [];
      this.groupService.getTasksDistinct()
        .then(tasks => this.tasks = tasks)
        .then(() => this.sortTasksByDate())
        .then(() => this.loaded = true);

      this.groups = [];
      this.groupService.getGroups()
        .then(groups => this.groups = groups);
    }

    this.today = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm');
  }

  ngOnChanges(): void {
    this.loaded = false;
    this.ngOnInit();
  }

  addTask(title: string, startDate: string,
          note: string, priority: number,
          gid: number, status: boolean) {

    if (title.length < 1 || !priority || !startDate || !gid) {
      this.showWrongInputMsg = true;
      return;
    }

    this.showWrongInputMsg = false;
    this.showAddMenu = false;
    this.groupService.createTask(
      this.tasks, title, new Date(startDate), note, priority, gid, status)
      .then(t => this.tasks.push(t));
  }

  deleteTask(task: Task): void {
    this.groupService
      .deleteTask(task.id)
      .then(() => this.tasks = this.tasks.filter(t => t !== task));
  }

  gotoTaskEditor(id: number) {
    this.router.navigate(['/tasks', id]);
  }

  sortTasksById() {
    this.sortService.sortTasksById(this.tasks);
  }

  sortTasksByTitle() {
    this.sortService.sortTasksByTitle(this.tasks);
  }

  sortTasksByDate() {
    this.sortService.sortTasksByDate(this.tasks);
  }

  sortTasksByNote() {
    this.sortService.sortTasksByNote(this.tasks);
  }

  sortTasksByPrio() {
    this.sortService.sortTasksByPrio(this.tasks);
  }

  sortTasksByStatus() {
    this.sortService.sortTasksByStatus(this.tasks);
  }
}
