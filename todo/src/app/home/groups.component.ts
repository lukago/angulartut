import {
  Component, EventEmitter, Input,
  OnChanges, OnInit, Output
} from '@angular/core';
import {Group} from '../models/group';
import {GroupService} from '../services/group.service';
import {Router} from '@angular/router';
import {Task} from '../models/task';
import {SortService} from '../services/sort.service';


@Component({
  selector: 'groups',
  templateUrl: './groups.component.html',
  providers: [SortService]
})
export class GroupsComponent implements OnInit, OnChanges {
  groups: Group[] = [];

  @Output() updated = new EventEmitter<boolean>();
  @Input() updateView: boolean;

  showAddMenu = false;
  showWrongInputMsg = false;
  loaded = false;

  constructor(private groupService: GroupService,
              private router: Router,
              private sortService: SortService) {
  }

  ngOnInit(): void {
    this.groups = [];
    this.groupService.getGroups()
      .then(groups => this.groups = groups)
      .then(() => this.loaded = true);
  }

  ngOnChanges(): void {
    this.loaded = false;
    this.ngOnInit();
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
      .then(group => this.groups.push(group))
      .then(() => this.updated.emit(true));
  }

  deleteGroup(group: Group): void {
    let tasks: Task[] = [];
    this.groupService.getTasksByGroupId(group.id)
      .then(res => tasks = res)
      .then(() => tasks.forEach(t => this.groupService.deleteTask(t.id)));

    this.groupService
      .deleteGroup(group.id)
      .then(() => this.groups = this.groups.filter(gr => gr !== group))
      .then(() => this.updated.emit(true));
  }

  sortGroupsById() {
    this.sortService.sortGroupsById(this.groups);
  }

  sortGroupsByName() {
    this.sortService.sortGroupsByName(this.groups);
  }
}
