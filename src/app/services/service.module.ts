import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, SidebarService, SharedService, UserService } from './service.index';
import { HttpClient, HttpClientModule } from '@angular/common/http';



@NgModule({
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UserService],
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServiceModule { }
