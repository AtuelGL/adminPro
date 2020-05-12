import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService,
         SidebarService,
         SharedService,
         UserService,
         LoginGuardGuard,
         AdminGuard,
         UploadFileService,
         HospitalService,
         MedicService,
         VerifytokenGuard
        } from './service.index';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';



@NgModule({
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UserService,
    LoginGuardGuard,
    AdminGuard,
    UploadFileService,
    ModalUploadService,
    HospitalService,
    MedicService,
    VerifytokenGuard
  ],
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServiceModule { }
