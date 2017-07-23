import {Component, OnInit} from '@angular/core';
import {GroupService} from '../services/group.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Group} from '../models/group';
import {Location} from '@angular/common';
import {Task} from '../models/task';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'group-editor',
  templateUrl: './group-editor.component.html'
})
export class GroupEditorComponent implements OnInit {
  group: Group;
  tasks: Task[] = [];
  showWrongInputMsg = false;
  loadedTasks = false;

  constructor(private groupService: GroupService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.groupService.getGroup(+params.get('id')))
      .subscribe(group => {
        this.group = group;
        this.groupService.getTasksByGroupId(this.group.id)
          .then(tasks => this.tasks = tasks)
          .then(() => this.loadedTasks = true);
      });
  }

  goBack(): void {
    this.location.back();
  }

  saveGroupChanges(): void {
    if (this.group.title.length < 1) {
      this.showWrongInputMsg = true;
      return;
    }

    this.showWrongInputMsg = false;
    this.groupService.updateGroup(this.group)
      .then(() => this.goBack());
  }
}
