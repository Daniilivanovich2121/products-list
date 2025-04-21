import { Routes } from '@angular/router';
import {ProductsListComponent} from './components/products-list/products-list.component';
import {BasketProductsComponent} from './components/basket-products/basket-products.component';
export const routes: Routes = [
  {
    path: 'products',
    component: ProductsListComponent
  },
  {
    path: 'basket',
    component: BasketProductsComponent
  }
];
