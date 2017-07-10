import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './home.component';
import {LocalStorageService} from './local-storage.service';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';
import {GroupService} from './group.service';
import {HttpModule} from '@angular/http';

@NgModule({
  imports:      [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  declarations: [
    AppComponent,
    HomeComponent
  ],
  providers:    [ GroupService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
