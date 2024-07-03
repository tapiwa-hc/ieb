import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TagifyComponent} from './tagify/dist/angular-tagify.component';

import { MaterialModule } from './material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { PendingComponent } from './pending/pending.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PendingItemComponent } from './pending-item/pending-item.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupsItemComponent } from './groups/groups-item/groups-item.component';
import { RGroupsItemComponent } from './groups/r-groups-item/r-groups-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NewComponent } from './new/new.component';
import { ExportComponent } from './export/export.component';
import { MarkedPipe } from './marked.pipe';
import { AllComponent } from './all/all.component';
import { AllItemComponent } from './all-item/all-item.component';
import { FeedComponent } from './feed/feed.component';
import { PrintoutComponent } from './printout/printout.component';
import { LoginComponent } from './login/login.component';
import { TokenInterceptorService } from './token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    PendingComponent,
    PendingItemComponent,
    GroupsComponent,
    GroupsItemComponent,
    RGroupsItemComponent,
    NewComponent,
    TagifyComponent,
    ExportComponent,
    MarkedPipe,
    AllComponent,
    AllItemComponent,
    FeedComponent,
    PrintoutComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    Title,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
