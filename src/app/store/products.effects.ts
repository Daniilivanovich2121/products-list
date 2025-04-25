import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {ApiService} from '../services/api.service';
import {
  createProduct, createProductFailure, createProductSuccess,
  deleteProduct, deleteProductFailure,
  deleteProductSuccess, editProduct, editProductFailure, editProductSuccess,
  getProducts,
  getProductsFailure,
  getProductsSuccess
} from './products.action';
import {catchError, map, of, switchMap} from 'rxjs';


export const getProductsEffects = createEffect(
  () => {
    const action$ = inject(Actions);
    const apiService = inject(ApiService);

    return action$.pipe(
      ofType(getProducts),
      switchMap(() => apiService.getProducts().pipe(
          map(products => getProductsSuccess({products})),
          // Добавьте обработку ошибок:
          catchError(error => of(getProductsFailure({error})))
        )
      ))
  },
  {functional: true}
);
export const deleteProductEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(deleteProduct),
      switchMap(({ id }) =>
        apiService.deleteProduct(id).pipe(
          map(() => deleteProductSuccess({ id })),
          catchError(error => of(deleteProductFailure({ error, id})))
        )
      )
    );
  },
  { functional: true }
);
export const createProductEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(createProduct),
      switchMap(({ product }) =>
        apiService.createProduct(product).pipe(
          map((createdProduct) => createProductSuccess({ product: createdProduct })),
          catchError(error => of(createProductFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const editProductEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(editProduct),
      switchMap(({ product }) =>
        apiService.updateProduct(product).pipe(
          map((product) => editProductSuccess({ product: product})),
          catchError(error => of(editProductFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);
