import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../models/api-url';
import {Product} from '../models/productModel';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly http = inject(HttpClient)

  public products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);


  public getProducts(): void {
    this.http.get<Product[]>(API_URL + "products").subscribe(products => this.products.next(products));
  }

}
