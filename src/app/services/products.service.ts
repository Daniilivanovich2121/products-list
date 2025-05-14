import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../models/api-url';
import {CreateProductModels, Product} from '../models/productModel';
import {BehaviorSubject, catchError, EMPTY, finalize, tap} from 'rxjs';
import {PRODUCTS_INITIAL_STATE, ProductsStateModel} from '../models/products-state.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly http = inject(HttpClient);

  private state: BehaviorSubject<ProductsStateModel> = new BehaviorSubject<ProductsStateModel>(PRODUCTS_INITIAL_STATE);

  public state$ = this.state.asObservable();

  private setState(partialState: Partial<ProductsStateModel>): void {
    this.state.next({...this.state.value, ...partialState});
  }

  getProducts(): void {
    this.setState({isLoading: true});
    this.http.get<Product[]>(API_URL + 'products').pipe(
      finalize(()  => this.setState({isLoading: false})),
      catchError(err => {
        this.setState({error: err});
        return EMPTY;
      })
    ).subscribe(product => {
      this.setState({products: product})
      this.setState({error: null})
    });
  }
  deleteProduct(product: Product): void {

    //  this.http.delete(API_URL + `products/${product.id}`).subscribe(() => this.getProducts() ) 1 способ
    // const products = this.products.value.filter(v => v.id !== product.id);
    // this.http.delete(API_URL + `products/${product.id}`).subscribe(() => this.products.next(products) ) 2 способ
   // коменты оставим как варианты
    const products: Product[] = this.state.value.products.filter(v => v.id !== product.id)

    this.http.delete(API_URL + `products/${product.id}`).pipe(
      tap(() => this.setState({products: products}))
    ).subscribe()
  }


  createProduct(newProduct: CreateProductModels): void {
    this.http.post<Product>(API_URL + 'products', newProduct).subscribe((product: Product): void => {
      this.setState({products:[...this.state.value.products,product]});
    })
  }

  updateProduct(updatedProduct: Product, id: number): void {
    this.http.put<Product>(API_URL + `products/${id}`, updatedProduct)
      .subscribe((product) => {
        this.setState({products:[...this.state.value.products.map(p =>
            p.id === product.id ? product : p
          )]});
      });
  }
}
