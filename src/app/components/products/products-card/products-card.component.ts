import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from '../models/productModel';
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
import {MatTooltip} from '@angular/material/tooltip';
import {User} from '../../user/models/userModel';

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
    MatCardImage,
    MatTooltip,
  ],
  templateUrl: './products-card.component.html',
  styleUrl: './products-card.component.scss'
})
export class ProductsCardComponent {
  @Input() product!: Product;
  @Output() productDelete = new EventEmitter<Product>();
  @Output() productEdit = new EventEmitter<Product>();
  @Output() productAddToBasket = new EventEmitter<Product>();



  public deleteProduct(product: Product): void {
    this.productDelete.emit(product);
  }

  public editProduct(product: Product): void {
    this.productEdit.emit(product);
  }

  public addToBasket(product: Product): void {
    this.productAddToBasket.emit(product);
  }
}



