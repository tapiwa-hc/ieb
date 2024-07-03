import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { PendingComponent } from './pending/pending.component';
import { HttpClientModule } from '@angular/common/http';
import { PendingItemComponent } from './pending-item/pending-item.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupsItemComponent } from './groups/groups-item/groups-item.component';
import { RGroupsItemComponent } from './groups/r-groups-item/r-groups-item.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    PendingComponent,
    PendingItemComponent,
    GroupsComponent,
    GroupsItemComponent,
    RGroupsItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
