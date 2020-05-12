import { Routes, RouterModule, CanActivate } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';





const appRoutes: Routes = [
    { path: 'login' , component: LoginComponent},
    { path: 'register' , component: RegisterComponent},
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        loadChildren: () => import('./pages/pages.module').then(mod => mod.PagesModule),
    },
    { path: '**' , component: PagenotfoundComponent}
];

export const APP_ROUTES = RouterModule.forRoot (appRoutes, {useHash: true});
