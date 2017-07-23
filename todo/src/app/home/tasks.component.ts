import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GroupService} from '../services/group.service';
import {Task} from '../models/task';
import {Group} from '../models/group';
import {SortService} from '../services/sort.service';
import {DatePipe} from '@angular/common';
import {PagerService} from '../services/pager.service';
import {Pager} from '../models/pager';
import {Observable} from 'rxjs/Observable';

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

  showSearchedTasks(searchedTasks: Observable<Task[]>): void {
    searchedTasks.subscribe(tasks => {
      this.tasks = tasks;
      this.setPage(1);
    });
  }

  ngOnInit(): void {
    if (this.useDb) {
      this.loadGroupsAndTasks();
    }

    this.today = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm');
  }

  ngOnChanges(): void {
    this.pager ? this.setPage(this.pager.currentPage) : this.setPage(1);
  }

  loadTasks() {
    this.loaded = false;
    this.tasks = [];
    this.groupService.getTasksDistinct()
      .then(tasks => this.tasks = tasks)
      .then(() => this.setPage(1))
      .then(() => console.log(this.tasks));
  }

  loadGroups(): void {
    this.loaded = false;
    this.groups = [];
    this.groupService.getGroups()
      .then(groups => this.groups = groups)
      .then(() => this.loaded = true);
  }

  loadGroupsAndTasks(): void {
    this.loaded = false;
    this.tasks = [];
    this.groups = [];
    this.groupService.getGroups()
      .then(groups => this.groups = groups)
      .then(() => this.groupService.getTasksDistinct()
        .then(tasks => this.tasks = tasks)
        .then(() => console.log(this.tasks)))
      .then(() => console.log((this.groups)))
      .then(() => this.setPage(1))
      .then(() => this.loaded = true);
  }

  addTask(title: string, startDate: string,
          note: string, priority: number,
          gid: string, status: boolean) {

    if (title.length < 1 || !priority || !startDate || !gid) {
      this.showWrongInputMsg = true;
      return;
    }

    this.showWrongInputMsg = false;
    this.showAddMenu = false;

    this.groupService
      .createTask(this.tasks, title, new Date(startDate),
        note, priority, Number.parseInt(gid), status)
      .then(t => this.tasks.push(t))
      .then(() => this.setPage(this.pager.currentPage));
  }

  deleteTask(task: Task): void {
    this.groupService.deleteTask(task.id);

    this.tasks = this.tasks.filter(t => t !== task);
    this.pagedTasks = this.pagedTasks.filter(t => t !== task);

    if (this.pagedTasks.length < 1) {
      this.pager.pages.pop();
      this.setPage(this.pager.currentPage);
    }
  }

  setPage(page: number) {
    this.pager = this.pagerService.createPager(this.tasks.length, page, 6);
    this.pagedTasks = this.tasks
      .slice(this.pager.startIndex, this.pager.endIndex + 1)
      .reverse();
  }

  gotoTaskEditor(id: number) {
    this.router.navigate(['/tasks', id]);
  }

  getGroupName(gid: number): string {
    return this.groups.find(gr => gr.id === gid).title;
  }

  sortTasksById() {
    this.sortService.sortTasksById(this.tasks);
    this.setPage(this.pager.currentPage);
  }

  sortTasksByTitle() {
    this.sortService.sortTasksByTitle(this.tasks);
    this.setPage(this.pager.currentPage);
  }

  sortTasksByGroupName() {
    this.tasks =
      this.sortService.sortTasksByGroupName(this.tasks, this.groups);
    this.setPage(this.pager.currentPage);
  }

  sortTasksByDate() {
    this.sortService.sortTasksByDate(this.tasks);
    this.setPage(this.pager.currentPage);
  }

  sortTasksByNote() {
    this.sortService.sortTasksByNote(this.tasks);
    this.setPage(this.pager.currentPage);
  }

  sortTasksByPrio() {
    this.sortService.sortTasksByPrio(this.tasks);
    this.setPage(this.pager.currentPage);
  }

  sortTasksByStatus() {
    this.sortService.sortTasksByStatus(this.tasks);
    this.setPage(this.pager.currentPage);
  }
}
