import {NgModule}       from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {FormsModule}    from '@angular/forms';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from '../services/in-memory-data.service';

import {AppComponent}         from '../components/app.component';
import {HeroDetailComponent}  from '../components/hero-detail.component';
import {HeroesComponent}      from '../components/heroes.component';
import {HeroService}          from '../services/hero.service';
import {DashboardComponent}   from '../components/dasboard.component';
import {AppRoutingModule}     from './app-routing.module';
import {HttpModule}           from '@angular/http';
import {HeroSearchComponent}  from '../components/hero-search.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroesComponent,
    DashboardComponent,
    HeroSearchComponent
  ],
  providers: [HeroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
