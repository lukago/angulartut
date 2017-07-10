import {Component} from '@angular/core';
import {GroupService} from './group.service';


@Component({
  selector: 'group-add',
  templateUrl: './group-add.component.html'
})
export class GroupAddComponent {

  constructor(private groupService: GroupService) { }

  addGroup(name: string): void {
    name = name.trim();
    if (!name) {return; }
    this.groupService.createGroup(name);
  }
}
