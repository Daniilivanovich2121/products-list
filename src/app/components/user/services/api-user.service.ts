import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CreateProductModels, Product} from '../../products/models/productModel';
import {API_URL} from '../../../core/api-url';
import {User} from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly http = inject(HttpClient)

  getUser() {
    return this.http.get<User>(API_URL + 'user')
  }

  deleteUser(id: number) {
    return this.http.delete<boolean>(API_URL + 'user/' + id)
  }

  createUser(product: CreateProductModels) {
    return this.http.post<User>(API_URL + 'user/', product)
  }

  updateUser(product: Product) {
    console.log(product)
    return this.http.put<Product>(API_URL + `user/${product.id}`, product)
  }
}
