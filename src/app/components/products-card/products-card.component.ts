import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../models/productModel';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader, MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {BasketService} from '../../services/basket.service';

@Component({
  selector: 'app-products-card',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    MatIconButton,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatCardTitle,
    MatCardSubtitle,
    MatCardImage
  ],
  templateUrl: './products-card.component.html',
  styleUrl: './products-card.component.scss'
})
export class ProductsCardComponent  implements OnInit {
  @Input() product!: Product;
  @Output() productDelete = new EventEmitter<Product>();
  @Output() productEdit = new EventEmitter<Product>();
  @Output() productAddToBasket = new EventEmitter<Product>();

  ngOnInit() {
    console.log(this.product);
  }

  public deleteProduct(product: Product) {
    this.productDelete.emit(product);
  }

  public editProduct(product: Product) {
    this.productEdit.emit(product);
  }
  public addToBasket(product: Product) {
    this.productAddToBasket.emit(product);
  }
}



