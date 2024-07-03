import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PendingComponent } from './pending/pending.component';
import { GroupsComponent } from './groups/groups.component';

const routes: Routes = [
  {path: '', redirectTo: 'pending', pathMatch: 'full'},
  {path: 'pending', component: PendingComponent, data: {title: "Pending"}},
  {path: 'groups', component: GroupsComponent, data: {title: "Groups"}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
