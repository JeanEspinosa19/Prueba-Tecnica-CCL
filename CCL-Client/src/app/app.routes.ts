import { Routes } from '@angular/router';
import { loginGuard } from './guards/login-guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import ('./home/home')
    },
    {
        path: 'login',
        loadComponent: () => import ('./login/login'),
        canActivate: [loginGuard]
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
