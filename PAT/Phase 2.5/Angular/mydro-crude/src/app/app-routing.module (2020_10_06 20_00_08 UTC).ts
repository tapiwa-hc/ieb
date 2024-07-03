import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PendingComponent } from './pending/pending.component';
import { GroupsComponent } from './groups/groups.component';
import { NewComponent } from './new/new.component';
import { ExportComponent } from './export/export.component';
import { AllComponent } from './all/all.component';
import { FeedComponent } from './feed/feed.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'export', pathMatch: 'full'},
  {path: 'pending', component: PendingComponent, data: {title: "Pending"}, canActivate: [AuthGuard]},
  {path: 'groups', component: GroupsComponent, data: {title: "Groups"}},
  {path: 'new', component: NewComponent, data: {title: "New"}},
  {path: 'export', component: ExportComponent, data: {title: "Export"}},
  {path: 'all', component: AllComponent, data: {title: "All"}},
  {path: 'feed', component: FeedComponent, data: {title: "User's Feed"}},
  {path: 'login', component: LoginComponent, data: {title: "Login"}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
