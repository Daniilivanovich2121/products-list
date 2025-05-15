import {Component, inject, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {BasketProductsService} from '../services/basket-products.service';
import {Store} from '@ngrx/store';
import {selectProducts, selectProductsError, selectProductsStatus} from '../store/products.selector';
import {createProduct, deleteProduct, editProduct, getProducts} from '../store/products.action';
import {CreateProductModels, Product} from '../models/productModel';
import {CreateProductsDialogComponent} from '../create-products-dialog/create-products-dialog.component';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatFabButton} from '@angular/material/button';
import {PushPipe} from '@ngrx/component';
import {MatProgressBar} from '@angular/material/progress-bar';
import {ProductsCardComponent} from '../products-card/products-card.component';
import {BasketProductsComponent} from '../basket-products/basket-products.component';
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-products-list',
  imports: [
    MatIcon,
    MatButton,
    MatFabButton,
    PushPipe,
    MatProgressBar,
    ProductsCardComponent,
    BasketProductsComponent,
    MatSidenavModule
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export default class ProductsListComponent implements OnInit {
  private readonly dialog = inject(MatDialog);
  private readonly basketService = inject(BasketProductsService);
  private readonly store = inject(Store);
  public readonly products$ = this.store.select(selectProducts)
  public readonly error$ = this.store.select(selectProductsError)
  public readonly isLoading$ = this.store.select(selectProductsStatus)

  ngOnInit(): void {
    this.init()
  }

  init(): void {
    this.store.dispatch(getProducts())
  }

  deleteProduct(product: Product): void {
    this.store.dispatch(deleteProduct({id: product.id}))
  }

  onAddToBasket(product: Product): void {
    this.basketService.addToBasket(product);
  }

  openDialog(editableProduct?: Product,): void {

    const dialogRef = this.dialog.open(CreateProductsDialogComponent, {
      width: '500px', height: '700px', data: editableProduct
    })
    dialogRef.afterClosed().subscribe((result: CreateProductModels):void => {
      if (result) {
        if (editableProduct) {
          const upProduct: Product = {
            ...editableProduct,
            ...result,
          }
          this.store.dispatch(editProduct({product: upProduct}));
        } else {
          this.store.dispatch(createProduct({product: result}))
        }
      }
    })
  }

  editProduct(editableProduct: Product): void {
    this.openDialog(editableProduct)
  }
}
