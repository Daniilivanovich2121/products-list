import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () => import('./components/products/products-list/products-list.component')

  },
  {
    path: 'users',
    loadComponent: () => import('./components/user/user-list/user-list.component')

  }
];
