import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PagesComponent } from './pages/pages.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent},
    {
        path: '',
        component: PagesComponent,
        loadChildren: './pages/pages.module#PagesModule'
    },
    { path: '**', redirectTo: '/login', }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
