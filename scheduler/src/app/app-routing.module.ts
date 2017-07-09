import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {TasksComponent} from './tasks.component';
import {DashboardComponent} from './dashboard.component';
import {TaskDetailComponent} from './task-detail.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'detail/:id', component: TaskDetailComponent},
  {path: 'tasks', component: TasksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
