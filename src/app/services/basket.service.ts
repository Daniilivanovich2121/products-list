import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Product} from '../models/productModel';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private basketItemsSubject = new BehaviorSubject<Product[]>([]);
  basketItems$ = this.basketItemsSubject.asObservable();


  addToBasket(product: Product, quantity: number = 1): void {

    const currentItems = this.basketItemsSubject.value;
    const existingItemIndex = currentItems.findIndex(item => item.id === product.id);

    if (existingItemIndex > -1) {
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: (updatedItems[existingItemIndex].quantity || 0) + quantity
      };
      this.basketItemsSubject.next(updatedItems);
    } else {
      this.basketItemsSubject.next([...currentItems, {...product, quantity}]);
    }
  }

  removeFromBasket(productId: number): void {
    const updatedItems = this.basketItemsSubject.value.filter(item => item.id !== productId);
    this.basketItemsSubject.next(updatedItems);
  }

  clearBasket(): void {
    this.basketItemsSubject.next([]);
  }

  getTotalItems(): number {
    return this.basketItemsSubject.value.reduce((total, item) => total + (item.quantity || 1), 0);
  }
}

