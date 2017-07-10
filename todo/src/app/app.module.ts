import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './home.component';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';
import {GroupService} from './group.service';
import {HttpModule} from '@angular/http';
import {TaskAddComponent} from './task-add.component';
import {GroupAddComponent} from './group-add.component';

@NgModule({
  imports:      [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    TaskAddComponent,
    GroupAddComponent
  ],
  providers:    [ GroupService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
