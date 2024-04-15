import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'day',
    loadComponent: () => import('./day/day.component').then(m => m.DayComponent),
  },
  {
    path: '',
    redirectTo: 'day',
    pathMatch: 'full',
  },
];
