import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';



@NgModule ({
    imports: [
        RouterModule,
        CommonModule
    ],
    declarations: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumsComponent,
        PagenotfoundComponent
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumsComponent,
        PagenotfoundComponent
    ]

})
export class SharedModule {}
