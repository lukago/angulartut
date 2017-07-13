import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from '../home/home.component';
import {GroupEditorComponent} from '../editors/group-editor.component';
import {TaskEditorComponent} from '../editors/task-editor.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'groups/:id', component: GroupEditorComponent},
  {path: 'tasks/:id', component: TaskEditorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
