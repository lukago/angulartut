import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {

  addToItem(item: string, json: string) {
    localStorage.setItem(item, localStorage.getItem(item) + json);
  }

  getItem(item: string): string {
    return localStorage.getItem(item);
  }
}
