import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'parking',
    loadComponent: () => import('./pages/parking/parking.component').then(m => m.ParkingComponent)
  },
  {
    path: 'rates',
    loadComponent: () => import('./pages/rates/rates.component').then(m => m.RatesComponent)
  },
  {
    path: 'vehicles',
    loadChildren: () => import('./pages/vehicles/vehicles.routes').then(m => m.vehiclesRoutes)
  },

  { path: '**', redirectTo: 'home' }
];
