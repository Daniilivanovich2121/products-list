import {createReducer, on} from '@ngrx/store';
import {PRODUCTS_INITIAL_STATE} from '../models/products-state.model';
import {
  createProduct, createProductFailure, createProductSuccess,
  deleteProduct, deleteProductFailure,
  deleteProductSuccess, editProduct, editProductFailure, editProductSuccess,
  getProducts,
  getProductsFailure,
  getProductsSuccess
} from './products.action';

export const productsReducer = createReducer(
  PRODUCTS_INITIAL_STATE,
  on(getProducts, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(getProductsSuccess, (state, {products}) => ({
    ...state,
    isLoading: false,
    products: products,
    error: null
  })),
  on(getProductsFailure, (state, {error}) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(deleteProduct, (state, {id}) => ({
    ...state,
    isLoading: true,
  })),
  on(deleteProductSuccess, (state, {id}) => ({
    ...state,
    isLoading: false,
    products: state.products.filter(product => product.id !== id),
    error: null
  })),
  on(deleteProductFailure, (state, {error, id}) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(createProduct, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(createProductSuccess, (state, {product}) => ({
    ...state,
    isLoading: false,
    products: [...state.products, product],
    error: null
  })),
  on(createProductFailure, (state, {error}) => ({
    ...state,
    isLoading: false,
    error
  })),
on(editProduct, (state) => ({
  ...state,
  isLoading: true,
})),
  on(editProductSuccess, (state, {editableProduct}) => ({
    ...state,
    isLoading: false,
    products: state.products.map(product =>
      product.id === editableProduct.id ? editableProduct : product),
    error: null
  })),
  on(editProductFailure, (state, {error}) => ({
    ...state,
    isLoading: false,
    error
  }))
);
