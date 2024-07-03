import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PendingComponent } from './pending/pending.component';
import { GroupsComponent } from './groups/groups.component';
import { NewComponent } from './new/new.component';
import { ExportComponent } from './export/export.component';
import { AllComponent } from './all/all.component';
import { FeedComponent } from './feed/feed.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminGuard } from './admin.guard';
import { StaffGuard } from './staff.guard';
import { PupilGuard } from './pupil.guard';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {title: "Home"},
    // canActivate: [AuthGuard]
  },
  {
    path: 'pending', 
    component: PendingComponent, 
    data: {title: "Pending"}, 
    canActivate: [AdminGuard]
  },
  {
    path: 'groups', 
    component: GroupsComponent, 
    data: {title: "Groups"},
    canActivate: [AdminGuard]
  },
  {
    path: 'new', 
    component: NewComponent, 
    data: {title: "New"},
    canActivate: [StaffGuard]
  },
  {
    path: 'export', 
    component: ExportComponent, 
    data: {title: "Export"},
    canActivate: [StaffGuard]
  },
  {
    path: 'all', 
    component: AllComponent, 
    data: {title: "All"},
    canActivate: [PupilGuard]
  },
  {
    path: 'feed', 
    component: FeedComponent, 
    data: {title: "My Feed"},
    canActivate: [PupilGuard]
  },
  {
    path: 'login', 
    component: LoginComponent, 
    data: {title: "Login"}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
