import {Group} from '../models/Group';
import {Task} from '../models/Task';
import {Injectable} from '@angular/core';

@Injectable()
export class SortService {

  private sorted = false;

  sortGroupsById(groups: Group[]) {
    if (!this.sorted) {
      groups.sort((a, b) => a.id - b.id);
      this.sorted = true;
    } else {
      groups.sort((a, b) => b.id - a.id);
      this.sorted = false;
    }
  }

  sortGroupsByName(groups: Group[]) {
    if (!this.sorted) {
      groups.sort((a, b) => a.title > b.title ? 1 : -1);
      this.sorted = true;
    } else {
      groups.sort((a, b) => a.title < b.title ? 1 : -1);
      this.sorted = false;
    }
  }

  sortTasksById(tasks: Task[]) {
    if (!this.sorted) {
      tasks.sort((a, b) => a.id - b.id);
      this.sorted = true;
    } else {
      tasks.sort((a, b) => b.id - a.id);
      this.sorted = false;
    }
  }

  sortTasksByTitle(tasks: Task[]) {
    if (!this.sorted) {
      tasks.sort((a, b) => a.title > b.title ? 1 : -1);
      this.sorted = true;
    } else {
      tasks.sort((a, b) => a.title < b.title ? 1 : -1);
      this.sorted = false;
    }
  }

  sortTasksByDate(tasks: Task[]) {
    if (!this.sorted) {
      tasks.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
      this.sorted = true;
    } else {
      tasks.sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
      this.sorted = false;
    }
  }

  sortTasksByPrio(tasks: Task[]) {
    if (!this.sorted) {
      tasks.sort((a, b) => a.priority - b.priority);
      this.sorted = true;
    } else {
      tasks.sort((a, b) => b.priority - a.priority);
      this.sorted = false;
    }
  }

  sortTasksByNote(tasks: Task[]) {
    if (!this.sorted) {
      tasks.sort((a, b) => a.note > b.note ? 1 : -1);
      this.sorted = true;
    } else {
      tasks.sort((a, b) => a.note < b.note ? 1 : -1);
      this.sorted = false;
    }
  }

  sortTasksByStatus(tasks: Task[]) {
    if (!this.sorted) {
      tasks.sort((a, b) => a.status > b.status ? 1 : -1);
      this.sorted = true;
    } else {
      tasks.sort((a, b) => a.status < b.status ? 1 : -1);
      this.sorted = false;
    }
  }
}
