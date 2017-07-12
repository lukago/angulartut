import {Component, OnInit} from '@angular/core';
import {GroupService} from '../services/group.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Group} from '../models/Group';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {Task} from '../models/Task';

@Component({
  selector: 'group-editor',
  templateUrl: './group-editor.component.html'
})
export class GroupEditorComponent implements OnInit {
  group: Group;
  tasks: Task[] = [];

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
          .then(tasks => this.tasks = tasks );
      });
  }

  goBack(): void {
    this.location.back();
  }

  saveToDb(): void {
    this.groupService.updateGroup(this.group)
      .then(() => this.goBack());
  }
}
