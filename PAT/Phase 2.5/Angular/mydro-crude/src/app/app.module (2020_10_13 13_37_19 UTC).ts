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
import {TextFieldModule} from '@angular/cdk/text-field';

import { NewComponent } from './new/new.component';
import { ExportComponent } from './export/export.component';
import { MarkedPipe } from './marked.pipe';
import { AllComponent } from './all/all.component';
import { AllItemComponent } from './all-item/all-item.component';
import { FeedComponent } from './feed/feed.component';
import { PrintoutComponent } from './printout/printout.component';
import { LoginComponent } from './login/login.component';
import { TokenInterceptorService } from './token-interceptor.service';
import { HomeComponent } from './home/home.component';
import { MobileLoginComponent } from './mobile/mobile-login/mobile-login.component';
import { FeedItemComponent } from './feed-item/feed-item.component';
import { HoverClassDirective } from './hover-class.directive';
import { PasswordComponent } from './password/password.component';

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
    LoginComponent,
    HomeComponent,
    MobileLoginComponent,
    FeedItemComponent,
    HoverClassDirective,
    PasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    TextFieldModule
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
