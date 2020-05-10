import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard, AdminGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { MedicComponent } from './medics/medic.component';
import { MedicsComponent } from './medics/medics.component';
import { SearchComponent } from './search/search.component';



const pagesRoutes: Routes = [
    {
    path: '' ,
     component: PagesComponent,
     canActivate: [LoginGuardGuard],
    children: [
        { path: 'progress' , component: ProgressComponent, data: { title: 'Barra de progreso' } },
        { path: 'graficas1' , component: Graficas1Component, data: { title: 'Gráficos' } },
        { path: 'dashboard' , component: DashboardComponent, data: { title: 'Dashboard' } },
        { path: 'promises' , component: PromisesComponent, data: { title: 'Promesas' } },
        { path: 'rxjs' , component: RxjsComponent, data: { title: 'RxJS' } },
        { path: 'accounts-settings' , component: AccountSettingsComponent, data: { title: 'Opciones de cuenta' } },
        { path: 'profile' , component: ProfileComponent, data: { title: 'Perfil de usuario' } },
        { path: 'search/:key' , component: SearchComponent, data: { title: 'Buscador' } },
        // Mantenimientos
        { path: 'users' , component: UsersComponent, canActivate: [AdminGuard], data: { title: 'Manejo de usuarios' } },
        { path: 'hospitals' , component: HospitalsComponent, data: { title: 'Manejo de hospitales' } },
        { path: 'medics' , component: MedicsComponent, data: { title: 'Manejo de medicos' } },
        { path: 'medic/:id' , component: MedicComponent, data: { title: 'Edición de medico' } },
        { path: '' , redirectTo: '/dashboard', pathMatch: 'full'},
        ]
    }
];
export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
