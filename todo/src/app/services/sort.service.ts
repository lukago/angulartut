import {Group} from '../models/Group';
import {Task} from '../models/Task';
import {Injectable} from '@angular/core';

@Injectable()
export class SortService {

  private gIdSorted = false;
  private gNameSorted = false;
  private tIdSorted = false;
  private tTitleSorted = false;
  private tDateSorted = false;
  private tPrioSorted = false;
  private tNoteSorted = false;
  private tStatusSorted = false;

  sortGroupsById(groups: Group[]) {
    if (!this.gIdSorted) {
      groups.sort((a, b) => a.id - b.id);
      this.gIdSorted = true;
    } else {
      groups.sort((a, b) => b.id - a.id);
      this.gIdSorted = false;
    }
  }

  sortGroupsByName(groups: Group[]) {
    if (!this.gNameSorted) {
      groups.sort((a, b) => a.title > b.title ? 1 : -1);
      this.gNameSorted = true;
    } else {
      groups.sort((a, b) => a.title < b.title ? 1 : -1);
      this.gNameSorted = false;
    }
  }

  sortTasksById(tasks: Task[]) {
    if (!this.tIdSorted) {
      tasks.sort((a, b) => a.id - b.id);
      this.tIdSorted = true;
    } else {
      tasks.sort((a, b) => b.id - a.id);
      this.tIdSorted = false;
    }
  }

  sortTasksByTitle(tasks: Task[]) {
    if (!this.tTitleSorted) {
      tasks.sort((a, b) => a.title > b.title ? 1 : -1);
      this.tTitleSorted = true;
    } else {
      tasks.sort((a, b) => a.title < b.title ? 1 : -1);
      this.tTitleSorted = false;
    }
  }

  sortTasksByDate(tasks: Task[]) {
    if (!this.tDateSorted) {
      tasks.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
      this.tDateSorted = true;
    } else {
      tasks.sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
      this.tDateSorted = false;
    }
  }

  sortTasksByPrio(tasks: Task[]) {
    if (!this.tPrioSorted) {
      tasks.sort((a, b) => a.priority - b.priority);
      this.tPrioSorted = true;
    } else {
      tasks.sort((a, b) => b.priority - a.priority);
      this.tPrioSorted = false;
    }
  }

  sortTasksByNote(tasks: Task[]) {
    if (!this.tNoteSorted) {
      tasks.sort((a, b) => a.note > b.note ? 1 : -1);
      this.tNoteSorted = true;
    } else {
      tasks.sort((a, b) => a.note < b.note ? 1 : -1);
      this.tNoteSorted = false;
    }
  }

  sortTasksByStatus(tasks: Task[]) {
    if (!this.tStatusSorted) {
      tasks.sort((a, b) => a.status > b.status ? 1 : -1);
      this.tStatusSorted = true;
    } else {
      tasks.sort((a, b) => a.status < b.status ? 1 : -1);
      this.tStatusSorted = false;
    }
  }
}
