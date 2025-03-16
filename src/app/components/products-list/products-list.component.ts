import {Component, inject, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {Product} from '../../models/productModel';
import {JsonPipe, NgForOf} from '@angular/common';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-products-list',
  imports: [
    NgForOf,
    JsonPipe
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit {
  private readonly productsService = inject(ProductsService)

  products:Product[] = []


  ngOnInit() {
    this.productsService.getProducts()
    this.productsService.products.subscribe(products => this.products = products);
  }
}
