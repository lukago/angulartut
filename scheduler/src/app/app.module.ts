import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';
import {AppRoutingModule} from './app-routing.module';
import {TasksService} from './tasks.service';
import {TasksComponent} from './tasks.component';
import {HttpModule} from '@angular/http';

@NgModule({
  imports:      [
    BrowserModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    TasksComponent
  ],
  providers:    [ TasksService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
