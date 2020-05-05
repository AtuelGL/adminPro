import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService,
         SidebarService,
         SharedService,
         UserService,
         LoginGuardGuard,
         UploadFileService
        } from './service.index';
import { HttpClient, HttpClientModule } from '@angular/common/http';



@NgModule({
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UserService,
    LoginGuardGuard,
    UploadFileService
  ],
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServiceModule { }
