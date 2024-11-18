import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AplicacionesComponent } from './aplicaciones/aplicaciones.component';
import { CrearServidorComponent } from './crear-servidor/crear-servidor.component';
import { ServidorInfoComponent } from './servidor-info/servidor-info.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'aplicaciones',
        component: AplicacionesComponent,
      },
      {
        path: 'aplicaciones/:id',
        component: ServidorInfoComponent
      },
      {
        path:'crear-servidor',
        component: CrearServidorComponent
    },
      { path: '', redirectTo: 'aplicaciones', pathMatch: 'full' },
    ],
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
