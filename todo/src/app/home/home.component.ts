import {Component} from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  updateTasksView = false;
  updateGroupsView = false;

  onGroupsUpdate(updated: boolean): void {
    if (updated) {
      this.updateTasksView = !this.updateGroupsView;
    }
  }

  onTasksUpdate(updated: boolean): void {
    if (updated) {
      this.updateGroupsView = !this.updateGroupsView;
    }
  }
}
