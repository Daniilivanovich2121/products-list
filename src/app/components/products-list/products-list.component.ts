import {Component, inject, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {CreateProductModels, Product} from '../../models/productModel';
import {ProductsCardComponent} from '../products-card/products-card.component';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {MatButton, MatFabButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {CreateProductsDialogComponent} from '../create-products-dialog/create-products-dialog.component';
import {RouterLink, RouterOutlet} from '@angular/router';
import {BasketService} from '../../services/basket.service';
import {async} from 'rxjs';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatProgressBar} from '@angular/material/progress-bar';
import {MatDrawer, MatDrawerContainer, MatSidenavModule} from '@angular/material/sidenav';
import {BasketProductsComponent} from '../basket-products/basket-products.component';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-products-list',
  imports: [
    MatSidenavModule,
    ProductsCardComponent,
    NgForOf,
    AsyncPipe,
    MatButton,
    RouterLink,
    RouterOutlet,
    NgIf,
    MatProgressSpinner,
    MatProgressBar,
    MatDrawerContainer,
    MatDrawer,
    BasketProductsComponent,
    MatIcon,
    MatFabButton
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit {

  readonly dialog = inject(MatDialog);
  private readonly productsService = inject(ProductsService)
  private readonly basketService = inject(BasketService);


  state$ = this.productsService.state$

  ngOnInit() {
    this.productsService.getProducts()
  }

  deleteProduct(product: Product) {
   this.productsService.deleteProduct(product)
  }

  deleteAllProducts() {
    this.productsService.deleteAllProducts()
  }

  onAddToBasket(product: Product): void {
    this.basketService.addToBasket(product);
    // Можно заменить на красивый toast/snackbar
    console.log(`${product.name} добавлен в корзину`);
  }


  openDialog(editableProduct?: Product, isEdit?: boolean) {

    const dialogRef = this.dialog.open(CreateProductsDialogComponent,{
      width: '500px', height: '700px', data: editableProduct
    })
    dialogRef.afterClosed().subscribe((result: CreateProductModels) => {
      if(result) {
        if(isEdit) {
          this.productsService.updateProduct(result as Product, editableProduct?.id as number)
        }
        else {
          this.productsService.createProduct(result)
        }
      }
    })
  }
  editProduct(editableProduct: Product) {
    this.openDialog(editableProduct, true)
  }

  protected readonly async = async;
}
