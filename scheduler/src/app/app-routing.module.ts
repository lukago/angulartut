import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {TasksComponent} from './tasks.component';

const routes: Routes = [
  {path: '', redirectTo: '/tasks', pathMatch: 'full'},
  // {path: 'dashboard', component: DashboardComponent},
  // {path: 'detail/:id', component: TaskDetailCompoenent},
  {path: 'tasks', component: TasksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
