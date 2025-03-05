import { Routes } from '@angular/router';
// import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    // canActivate: [AuthGuard]
  },
  {
    path: 'parking',
    loadComponent: () =>
      import('./pages/parking/pages/parking/parking.component').then(
        (m) => m.ParkingComponent,
      ),
    // canActivate: [AuthGuard]
  },
  {
    path: 'rates',
    loadComponent: () =>
      import('./pages/rates/pages/rates/rates.component').then(
        (m) => m.RatesComponent,
      ),
    // canActivate: [AuthGuard]
  },
  {
    path: 'vehicles',
    loadChildren: () =>
      import('./pages/vehicles/vehicles.routes').then((m) => m.vehiclesRoutes),
    // canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'home' },
];
