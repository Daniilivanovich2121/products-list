import {createFeature, createFeatureSelector, createSelector} from '@ngrx/store';
import {ProductsStateModel} from '../models/products-state.model';


export const selectProductsState = createFeatureSelector<ProductsStateModel>("Products");

export const selectProductsStatus = createSelector(
  selectProductsState,
  (state: ProductsStateModel) => state.isLoading
)
export const selectProductsError = createSelector(
  selectProductsState,
  (state: ProductsStateModel) => state.error
)
export const selectProducts = createSelector(
  selectProductsState,
  (state: ProductsStateModel) => state.products
)
