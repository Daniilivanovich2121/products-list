import {Product} from './productModel';

 export interface ProductsStateModel {
  isLoading: boolean
  products: Product[]
  error: any
}

 export const PRODUCTS_INITIAL_STATE: ProductsStateModel = {
   isLoading: false,
   products: [],
   error: null,
 }

