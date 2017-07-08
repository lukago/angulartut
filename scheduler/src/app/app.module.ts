import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';
import {AppRoutingModule} from './app-routing.module';
import {TasksService} from './tasks.service';
import {TasksComponent} from './tasks.component';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {DashboardComponent} from './dashboard.component';
import {TaskDetailComponent} from './task-detail.component';

@NgModule({
  imports:      [
    BrowserModule,
    HttpModule,
    FormsModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    TasksComponent,
    DashboardComponent,
    TaskDetailComponent
  ],
  providers:    [ TasksService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
