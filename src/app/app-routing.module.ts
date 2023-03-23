import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProjectComponent } from './component/create-project/create-project.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { GraphComponent } from './component/graph/graph.component';
import { LoginComponent } from './component/login/login.component';
import { ProjectListComponent } from './component/project-list/project-list.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'create-project', component: CreateProjectComponent },
  { path: 'project-list', component: ProjectListComponent },
  { path: 'graph', component: GraphComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
