import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Group} from '../models/group';
import {GroupService} from '../services/group.service';
import {Router} from '@angular/router';
import {Task} from '../models/task';
import {SortService} from '../services/sort.service';
import {PagerService} from '../services/pager.service';
import {Pager} from '../models/pager';


@Component({
  selector: 'groups',
  templateUrl: './groups.component.html',
  providers: [SortService, PagerService]
})
export class GroupsComponent implements OnInit {
  groups: Group[] = [];
  pagedGroups: Group[] = [];
  pager: Pager;

  @Output() deleted = new EventEmitter();
  @Output() added = new EventEmitter();

  showAddMenu = false;
  showWrongInputMsg = false;
  loaded = false;

  constructor(private groupService: GroupService,
              private router: Router,
              private sortService: SortService,
              private pagerService: PagerService) {
  }

  ngOnInit(): void {
    this.groups = [];
    this.groupService.getGroups()
      .then(groups => this.groups = groups)
      .then(() => this.setPage(1))
      .then(() => this.loaded = true);
  }

  gotoGroupEditor(id: number): void {
    this.router.navigate(['/groups', id]);
  }

  addGroup(name: string): void {
    if (!name) {
      this.showWrongInputMsg = true;
      return;
    }

    this.showWrongInputMsg = false;
    this.showAddMenu = false;
    name = name.trim();

    this.groupService.createGroup(name)
      .then(group => {
        this.groups.push(group);
        this.setPage(this.pager.currentPage);
      })
      .then(() => this.added.emit());
  }

  deleteGroup(group: Group): void {
    let tasks: Task[] = [];
    this.groupService.getTasksByGroupId(group.id)
      .then(res => tasks = res)
      .then(() => tasks.forEach(t => this.groupService.deleteTask(t.id)));

    this.groupService.deleteGroup(group.id)
      .then(() => this.deleted.emit());

    this.groups.splice(this.groups.indexOf(group), 1);
    this.pagedGroups = this.pagedGroups.filter(gr => gr !== group);

    if (this.pagedGroups.length < 1) {
      this.pager.pages.pop();
      this.setPage(this.pager.currentPage);
    }
  }

  setPage(page: number) {
    this.pager = this.pagerService.createPager(this.groups.length, page, 6);
    this.pagedGroups = this.groups.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  sortGroupsById() {
    this.sortService.sortGroupsById(this.groups);
  }

  sortGroupsByName() {
    this.sortService.sortGroupsByName(this.groups);
  }
}
