import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import ('./home/home')
    },
    {
        path: 'productos',
        loadComponent: () => import ('./productos/productos')
    }
];
