import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from '../../models/productModel';

@Component({
  selector: 'app-products-card',
  imports: [],
  templateUrl: './products-card.component.html',
  styleUrl: './products-card.component.scss'
})
export class ProductsCardComponent {

  @Input() product!: Product;

  @Output() productDelete = new EventEmitter<Product>();

  public deleteProduct(product: Product) {
  this.productDelete.emit(product);
  }
}
