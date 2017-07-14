import {Component} from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  /**
   * Flag bound as input to TasksComponent.
   * TasksComponents registers chages of this flag by ngOnChanges
   * and updates view by reloading tasks.
   * @type {boolean}
   */
  updateTasksView = false;

  /**
   * Flag bound as input to GroupComponent.
   * GroupsComponents registers chages of this flag by ngOnChanges
   * and updates view by reloading tasks.
   * @type {boolean}
   */
  updateGroupsView = false;

  /**
   * GroupsComponent emits events if it has been updated.
   * Change flag to call ngOnChanges in TasksComponent.
   * @param updated Flag from EventEmitter
   */
  onGroupsUpdate(updated: boolean): void {
    if (updated) {
      this.updateTasksView = !this.updateTasksView;
    }
  }

  /**
   * TasksComponent emits events if it has been updated.
   * Change flag to call ngOnChanges in GroupsComponent.
   * @param updated Flag from EventEmitter
   */
  onTasksUpdate(updated: boolean): void {
    if (updated) {
      this.updateGroupsView = !this.updateGroupsView;
    }
  }
}
