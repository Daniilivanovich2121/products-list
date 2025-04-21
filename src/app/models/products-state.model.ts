import {Product} from './productModel';

interface ProductsStateModel {
  isLoading: boolean
  products: Product[]
  error: any
}

const PRODUCTS_INITIAL_STATE: ProductsStateModel = {
  isLoading: false,
  products: [],
  error: null,
}
