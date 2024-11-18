import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path:'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)
    },
    {
        path:'auth',
        loadChildren: () => import('./auth/login.routes').then(m => m.AUTH_ROUTES)
    }
];
