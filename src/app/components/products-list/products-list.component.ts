import {Component, inject, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {CreateProductModels, Product} from '../../models/productModel';
import {ProductsCardComponent} from '../products-card/products-card.component';
import {AsyncPipe, NgForOf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {CreateProductsDialogComponent} from '../create-products-dialog/create-products-dialog.component';

@Component({
  selector: 'app-products-list',
  imports: [
    ProductsCardComponent,
    NgForOf,
    AsyncPipe,
    MatButton
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit {

  readonly dialog = inject(MatDialog);
  private readonly productsService = inject(ProductsService)

  products$ = this.productsService.products$

  ngOnInit() {
    this.productsService.getProducts()
  }

  deleteProduct(product: Product) {
   this.productsService.deleteProduct(product)
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
}
