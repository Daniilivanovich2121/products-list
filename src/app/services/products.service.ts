import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../models/api-url';
import {Product} from '../models/productModel';
import {BehaviorSubject, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

   private readonly http = inject(HttpClient);

   private productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

   public products$ = this.productsSubject.asObservable();

   getProducts(): void {
     this.http.get<Product[]>(API_URL + 'products').subscribe(product => this.productsSubject.next(product));
   }

   deleteProduct(product: Product) {
   //  this.http.delete(API_URL + `products/${product.id}`).subscribe(() => this.getProducts() ) 1 способ

    // const products = this.products.value.filter(v => v.id !== product.id);
    // this.http.delete(API_URL + `products/${product.id}`).subscribe(() => this.products.next(products) ) 2 способ

     const products = this.productsSubject.value.filter(v => v.id !== product.id)

     this.http.delete(API_URL + `products/${product.id}`).pipe(
       tap(() => this.productsSubject.next(products))
     ).subscribe()
   }

}
