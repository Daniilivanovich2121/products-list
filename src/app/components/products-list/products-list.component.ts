import {Component, inject, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {BehaviorSubject} from 'rxjs';
import {Product} from '../../models/productModel';
import {ProductsCardComponent} from '../products-card/products-card.component';
import {AsyncPipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-products-list',
  imports: [
    ProductsCardComponent,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit {

  private readonly productsService = inject(ProductsService)

  products$ = this.productsService.products


  ngOnInit() {
    this.productsService.getProducts()
  }
}
