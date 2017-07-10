import {Component, OnInit} from '@angular/core';
import {Group} from './Group';
import {Task} from './Task';
import {GroupService} from './group.service';

@Component({
  selector: 'app',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  groups: Group[];
  allTasks: Task[];

  constructor(private groupService: GroupService) {
    this.allTasks = [];
    this.groups = [];
  }

  ngOnInit(): void {
    this.groupService.getGroups()
      .then(groups => this.groups = groups)
      .then(() => this.fetchTasksFromGroups());
    console.log(this.allTasks);
  }

  private fetchTasksFromGroups() {
    this.groups.forEach(gr => gr.tasks.forEach(
      t => this.allTasks.push(t)));

    // make disctinct todo
    let it = 0;
    for(let i = 0; i < this.allTasks.length; i++) {
      for(let j = 0; j < this.allTasks.length; j++) {
        if (this.allTasks[i] === this.allTasks[j]) {
          it++;
        }
      }
    }
  }
}
