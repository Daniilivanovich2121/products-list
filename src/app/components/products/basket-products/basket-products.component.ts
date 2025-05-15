import {Component} from '@angular/core';
import {BasketProductsService} from '../services/basket-products.service';
import {AsyncPipe, CurrencyPipe, NgForOf, } from '@angular/common';
import {MatCard,MatCardContent} from '@angular/material/card';

@Component({
  selector: 'app-basket-products',
  imports: [
    AsyncPipe,
    CurrencyPipe,
    MatCard,
    MatCardContent,
    NgForOf,
  ],
  templateUrl: './basket-products.component.html',
  styleUrl: './basket-products.component.scss'

})
export class BasketProductsComponent {

  constructor(public basketService: BasketProductsService) {

  }

  removeItem(productId: number): void {
    this.basketService.removeFromBasket(productId);
  }

  clearBasket(): void {
    this.basketService.clearBasket();

  }
}
