import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CreateProductModels, Product} from '../models/productModel';
import {API_URL} from '../models/api-url';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly http = inject(HttpClient)

  getProducts() {
    return this.http.get<Product[]>(API_URL + 'products')
  }

  deleteProduct(id: number) {
    return this.http.delete<boolean>(API_URL + 'products/' + id)
  }

  createProduct(product: CreateProductModels) {
    return this.http.post<Product>(API_URL + 'products/', product)
  }

  updateProduct(product: Product) {
    console.log(product)
    return this.http.put<Product>(API_URL + `products/${product.id}`, product)
  }
}
