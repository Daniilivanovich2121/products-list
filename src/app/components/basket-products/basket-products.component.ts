import {Component} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Product} from '../../models/productModel';
import {BasketService} from '../../services/basket.service';
import {AsyncPipe, CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-basket-products',
  imports: [
    AsyncPipe,
    CurrencyPipe,
    MatIcon,
    MatCardActions,
    MatCard,
    MatCardContent,
    MatIconButton,
    NgForOf,
    NgIf,
  ],
  templateUrl: './basket-products.component.html',
  styleUrl: './basket-products.component.scss'
})
export class BasketProductsComponent {

  constructor(public basketService: BasketService) {
  }

  removeItem(productId: number): void {
    this.basketService.removeFromBasket(productId);
  }

  clearBasket(): void {
    this.basketService.clearBasket();

  }
}
