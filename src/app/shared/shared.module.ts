import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Pipe module
import { PipesModule } from '../pipes/pipes.module';

import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';



@NgModule ({
    imports: [
        RouterModule,
        CommonModule,
        PipesModule
    ],
    declarations: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumsComponent,
        PagenotfoundComponent,
        ModalUploadComponent
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumsComponent,
        PagenotfoundComponent,
        ModalUploadComponent
    ]

})
export class SharedModule {}
