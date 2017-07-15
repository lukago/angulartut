import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GroupService} from '../services/group.service';
import {Task} from '../models/task';
import {Group} from '../models/group';
import {SortService} from '../services/sort.service';
import {DatePipe} from '@angular/common';
import {PagerService} from '../services/pager.service';
import {Pager} from '../models/pager';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  providers: [SortService, DatePipe, PagerService]
})
export class TasksComponent implements OnInit, OnChanges {
  @Input() tasks: Task[] = [];
  @Input() groups: Group[] = [];
  @Input() useDb = true;
  @Input() loaded = false;

  pagedTasks: Task[] = [];
  pager: Pager;

  showAddMenu = false;
  showWrongInputMsg = false;
  today: string;

  constructor(private groupService: GroupService,
              private router: Router,
              private sortService: SortService,
              private datePipe: DatePipe,
              private pagerService: PagerService) {
  }

  ngOnInit(): void {
    if (this.useDb) {
      this.loadTasks();
      this.loadGroups();
    }

    this.today = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm');
  }

  loadTasks(): void {
    this.tasks = [];
    this.groupService.getTasksDistinct()
      .then(tasks => this.tasks = tasks)
      .then(() => this.tasks.sort(
        (a, b) => a.startDate.getTime() - b.startDate.getTime()))
      .then(() => this.setPage(1))
      .then(() => this.loaded = true);
  }

  loadGroups(): void {
    this.groups = [];
    this.groupService.getGroups()
      .then(groups => this.groups = groups);
  }

  ngOnChanges(): void {
    if (!this.useDb) {
      if (this.pager) {
        this.tasks.sort(
          (a, b) => a.startDate.getTime() - b.startDate.getTime())
        this.setPage(this.pager.currentPage);
      } else {
        this.setPage(1);
      }
    }
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
      .then(t => {
        this.tasks.push(t);
        this.setPage(this.pager.currentPage);
      });
  }

  deleteTask(task: Task): void {
    this.groupService.deleteTask(task.id);

    this.tasks.splice(this.tasks.indexOf(task), 1);
    this.pagedTasks = this.pagedTasks.filter(t => t !== task);

    if (this.pagedTasks.length < 1) {
      this.pager.pages.pop();
      this.setPage(this.pager.currentPage);
    }
  }

  setPage(page: number) {
    this.pager = this.pagerService.createPager(this.tasks.length, page, 6);
    this.pagedTasks =
      this.tasks.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.pagedTasks.sort(
      (a, b) => b.startDate.getTime() - a.startDate.getTime());
  }

  gotoTaskEditor(id: number) {
    this.router.navigate(['/tasks', id]);
  }

  sortTasksById() {
    this.sortService.sortTasksById(this.pagedTasks);
  }

  sortTasksByTitle() {
    this.sortService.sortTasksByTitle(this.pagedTasks);
  }

  sortTasksByDate() {
    this.sortService.sortTasksByDate(this.pagedTasks);
  }

  sortTasksByNote() {
    this.sortService.sortTasksByNote(this.pagedTasks);
  }

  sortTasksByPrio() {
    this.sortService.sortTasksByPrio(this.pagedTasks);
  }

  sortTasksByStatus() {
    this.sortService.sortTasksByStatus(this.pagedTasks);
  }
}
