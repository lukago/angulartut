import {Component, OnInit} from '@angular/core';
import {Group} from './Group';
import {Task} from './Task';
import {GroupService} from './group.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  groups: Group[];
  tasks: Task[];

  constructor(
    private groupService: GroupService,
    private router: Router
  ) {
    this.tasks = [];
    this.groups = [];
  }

  ngOnInit(): void {
    this.groupService.getGroups()
      .then(groups => this.groups = groups);

    this.groupService.getTasksDistinct()
      .then(tasks => this.tasks = tasks);
  }

  gotoAddTask() {
    this.router.navigateByUrl('/add-task');
  }

  gotoAddGroup() {
    this.router.navigateByUrl('/add-group');
  }
}
