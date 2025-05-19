import {createAction, props} from '@ngrx/store';
import {CreateProductModels, Product} from '../models/productModel';


export const getProducts = createAction('[Products] Get Products]' )

export const getProductsSuccess    = createAction('[Products] Get Products Successfully', props<{products:Product[]}>())

export const getProductsFailure = createAction('[Products] Get Products Failure', props<{error:any}>())


// Action для инициации удаления продукта
export const deleteProduct = createAction('[Products] Delete Product', props<{ id:number }>())// или number, в зависимости от вашего ID);

// Action при успешном удалении продукта
export const deleteProductSuccess = createAction('[Products] Delete Product Success', props<{ id:number }>())// Возвращаем ID удаленного продукта);
// Action при ошибке удаления продукта
export const deleteProductFailure = createAction('[Products] Delete Product Failure', props<{ error: any, id:number }>()) // Добавляем ID для отслеживания);


export const createProduct = createAction('[Products] Create Product', props<{ product: CreateProductModels }>());

// Action при успешном создании продукта
export const createProductSuccess = createAction('[Products] Create Product Success', props<{ product: Product }>());

// Action при ошибке создания продукта
export const createProductFailure = createAction('[Products] Create Product Failure', props<{ error: any }>());



export const editProduct = createAction('[Products] Create Product', props<{ product:Product }>());

export const editProductSuccess = createAction('[Products] Create Product Success', props<{ editableProduct: Product }>());

// Action при ошибке создания продукта
export const editProductFailure = createAction('[Products] Create Product Failure', props<{ error: any }>());

