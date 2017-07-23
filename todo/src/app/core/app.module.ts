import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent}  from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from '../home/home.component';
import {GroupService} from '../services/group.service';
import {HttpModule} from '@angular/http';
import {GroupsComponent} from '../home/groups.component';
import {TasksComponent} from '../home/tasks.component';
import {GroupEditorComponent} from '../editors/group-editor.component';
import {FormsModule} from '@angular/forms';
import {TaskEditorComponent} from '../editors/task-editor.component';
import {SearchComponent} from '../navbar/search.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    GroupsComponent,
    TasksComponent,
    GroupEditorComponent,
    TaskEditorComponent,
    SearchComponent,
  ],
  providers: [GroupService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
