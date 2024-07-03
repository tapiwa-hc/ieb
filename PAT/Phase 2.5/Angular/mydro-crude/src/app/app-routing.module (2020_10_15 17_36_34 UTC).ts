import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { AllComponent } from './all/all.component';
import { AuthGuard } from './auth.guard';
import { DeviceGuard } from './device.guard';
import { ExportComponent } from './export/export.component';
import { FeedComponent } from './feed/feed.component';
import { GroupsComponent } from './groups/groups.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MobileLoginComponent } from './mobile/mobile-login/mobile-login.component';
import { NewComponent } from './new/new.component';
import { PasswordComponent } from './password/password.component';
import { PendingComponent } from './pending/pending.component';
import { PupilGuard } from './pupil.guard';
import { AllTableResolverService } from './resolvers/all-table-resolver.service';
import { FeedResolverService } from './resolvers/feed-resolver.service';
import { GroupsResolverService } from './resolvers/groups-resolver.service';
import { PendingResolverService } from './resolvers/pending-resolver.service';
import { SectionsResolverService } from './resolvers/sections-resolver.service';
import { StudentsResolverService } from './resolvers/students-resolver.service';
import { SubsResolverService } from './resolvers/subs-resolver.service';
import { StaffGuard } from './staff.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' },
    canActivate: [DeviceGuard],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: 'home',
        component: HomeComponent,
        data: { title: 'Home' },
      },
      {
        path: 'pending',
        component: PendingComponent,
        data: { title: 'Pending' },
        canActivate: [AdminGuard],
        resolve: {
          pendingNotices: PendingResolverService,
        },
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'groups',
        component: GroupsComponent,
        data: { title: 'Groups' },
        canActivate: [AdminGuard],
        resolve: {
          groupList: GroupsResolverService,
          sectionInfo: SectionsResolverService,
        },
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'new',
        component: NewComponent,
        data: { title: 'New' },
        canActivate: [StaffGuard],
        resolve: {
          groupList: GroupsResolverService,
          sectionInfo: SectionsResolverService,
          students: StudentsResolverService,
        },
      },
      {
        path: 'export',
        component: ExportComponent,
        data: { title: 'Export' },
        canActivate: [StaffGuard],
        resolve: {
          sectionInfo: SectionsResolverService,
        },
      },
      {
        path: 'all',
        component: AllComponent,
        data: { title: 'All' },
        canActivate: [PupilGuard],
        resolve: {
          allNotices: AllTableResolverService,
        },
      },
      {
        path: 'feed',
        component: FeedComponent,
        data: { title: 'My Feed' },
        canActivate: [PupilGuard],
        resolve: {
          sectionInfo: SectionsResolverService,
          feed: FeedResolverService,
          subs: SubsResolverService,
        },
      },
      {
        path: 'password',
        component: PasswordComponent,
        data: { title: 'Change Password' },
        canActivate: [PupilGuard],
      },
    ],
    canActivate: [AuthGuard, DeviceGuard], // <-- Activate only if logged in and on desktop
  },
  {
    path: 'mobile',
    children: [
      {
        path: 'login',
        component: MobileLoginComponent,
        data: { title: 'Login' },
        canActivate: [DeviceGuard],
      },
      {
        path: 'feed',
        component: FeedComponent,
        data: { title: 'My Feed' },
        resolve: {
          feed: FeedResolverService,
          sectionInfo: SectionsResolverService,
        },
        canActivate: [AuthGuard, DeviceGuard],
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
