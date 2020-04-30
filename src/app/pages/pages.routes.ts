import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';



const pagesRoutes: Routes = [
    {
    path: '' ,
     component: PagesComponent,
    children: [
        { path: 'progress' , component: ProgressComponent},
        { path: 'graficas1' , component: Graficas1Component},
        { path: 'dashboard' , component: DashboardComponent},
        { path: 'promises' , component: PromisesComponent},
        { path: 'rxjs' , component: RxjsComponent},
        { path: 'accounts-settings' , component: AccountSettingsComponent},
        { path: '' , redirectTo: '/dashboard', pathMatch: 'full'},
        ]
    }
];
export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
