import {Component, Input} from '@angular/core';
import {Product} from '../../models/productModel';

@Component({
  selector: 'app-products-card',
  imports: [],
  templateUrl: './products-card.component.html',
  styleUrl: './products-card.component.scss'
})
export class ProductsCardComponent {

  @Input() product!: Product;

}
