import { TextFieldModule } from '@angular/cdk/text-field';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AllItemComponent } from './all-item/all-item.component';
import { AllComponent } from './all/all.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { ExportComponent } from './export/export.component';
import { FeedItemComponent } from './feed-item/feed-item.component';
import { FeedComponent } from './feed/feed.component';
import { GroupsDialogComponent } from './groups/groups-dialog/groups-dialog.component';
import { GroupsItemComponent } from './groups/groups-item/groups-item.component';
import { GroupsComponent } from './groups/groups.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MarkedPipe } from './marked.pipe';
import { MaterialModule } from './material/material.module';
import { MobileLoginComponent } from './mobile/mobile-login/mobile-login.component';
import { NewComponent } from './new/new.component';
import { PasswordComponent } from './password/password.component';
import { PendingDialogComponent } from './pending-dialog/pending-dialog.component';
import { PendingItemComponent } from './pending-item/pending-item.component';
import { PendingComponent } from './pending/pending.component';
import { PrintoutComponent } from './printout/printout.component';
import { TokenInterceptorService } from './token-interceptor.service';
import { TopBarComponent } from './top-bar/top-bar.component';
import { TableComponent } from './table/table.component';
import { TableItemComponent } from './table/table-item/table-item.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    PendingComponent,
    PendingItemComponent,
    GroupsComponent,
    GroupsItemComponent,
    NewComponent,
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
    PasswordComponent,
    AutofocusDirective,
    PendingDialogComponent,
    GroupsDialogComponent,
    TableComponent,
    TableItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    TextFieldModule,
  ],
  providers: [
    Title,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
