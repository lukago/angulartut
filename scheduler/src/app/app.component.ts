import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <nav>
      <a routerLink="/dashboard">Dashboard</a>
      <a routerLink="/tasks">Tasks</a>
    </nav>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent { }
