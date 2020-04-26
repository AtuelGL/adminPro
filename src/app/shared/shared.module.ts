import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';



@NgModule ({
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
