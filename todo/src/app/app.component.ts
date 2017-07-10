import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <nav class="container">
      <a routerLink="/home">Home</a>
    </nav>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {  }
