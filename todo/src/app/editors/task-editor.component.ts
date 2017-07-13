import {Component, OnInit} from '@angular/core';
import {GroupService} from '../services/group.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Group} from '../models/Group';
import {Location} from '@angular/common';
import {Task} from '../models/Task';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'task-editor',
  templateUrl: './task-editor.component.html'
})
export class TaskEditorComponent implements OnInit {
  task: Task;
  group: Group;
  dateStr: string;
  groups: Group[] = [];

  constructor(private groupService: GroupService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.groupService.getTask(+params.get('id')))
      .subscribe(task => {
        this.task = task;
        this.dateStr =
          this.getISOstringNoZone(this.task.startDate);
        this.groupService.getGroups()
          .then(groups => this.groups = groups)
          .then(() => this.group =
            this.groups.find(gr => gr.id === task.id));
      });
  }

  goBack(): void {
    this.location.back();
  }

  getISOstringNoZone(date: Date): string {
    let str = date.toISOString();
    return str.substring(0, str.length - 2);
  }

  saveTaskChanges(): void {
    this.task.startDate = new Date(this.dateStr);
    this.groupService.updateTask(this.task)
      .then(() => this.goBack());
  }

}
