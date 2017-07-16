import {Component, OnInit} from '@angular/core';
import {GroupService} from '../services/group.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Group} from '../models/group';
import {DatePipe, Location} from '@angular/common';
import {Task} from '../models/task';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'task-editor',
  templateUrl: './task-editor.component.html',
  providers: [DatePipe]
})
export class TaskEditorComponent implements OnInit {
  task: Task;
  group: Group;
  dateStr: string;
  groups: Group[] = [];
  showWrongInputMsg = false;

  constructor(private groupService: GroupService,
              private route: ActivatedRoute,
              private location: Location,
              private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.groupService.getTask(+params.get('id')))
      .subscribe(task => {
        this.task = task;
        this.dateStr =
          this.datePipe.transform(this.task.startDate, 'yyyy-MM-ddTHH:mm');
        this.groupService.getGroups()
          .then(groups => this.groups = groups)
          .then(() => this.group = this.groups.find(gr => gr.id === task.id));
      });
  }

  goBack(): void {
    this.location.back();
  }

  saveTaskChanges(): void {
    if (this.task.title.length < 1 || !this.task.priority || !this.dateStr) {
      this.showWrongInputMsg = true;
      return;
    }

    this.task.startDate = new Date(this.dateStr);
    this.groupService.updateTask(this.task)
      .then(() => this.goBack());
  }
}
