import {Component, inject, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {BasketService} from '../../services/basket.service';
import {Store} from '@ngrx/store';
import {selectProducts, selectProductsError, selectProductsStatus} from '../../store/products.selector';
import {createProduct, deleteProduct, editProduct, getProducts} from '../../store/products.action';
import {CreateProductModels, Product} from '../../models/productModel';
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
export class ProductsListComponent implements OnInit {

    readonly dialog = inject(MatDialog);
    private readonly basketService = inject(BasketService);
    private readonly store = inject(Store);
    public products$ = this.store.select(selectProducts)
    public error$ = this.store.select(selectProductsError)
    public isLoading$ = this.store.select(selectProductsStatus)

    ngOnInit() {
        this.init()
    }

    init() {
        this.store.dispatch(getProducts())
    }

    deleteProduct(product: Product) {
        this.store.dispatch(deleteProduct({id: product.id}))
    }

    deleteAllProducts() {
    }

    onAddToBasket(product: Product): void {
        this.basketService.addToBasket(product);
        // Можно заменить на красивый toast/snackbar
        console.log(`${product.name} добавлен в корзину`);
    }


    openDialog(editableProduct?: Product,) {

        const dialogRef = this.dialog.open(CreateProductsDialogComponent, {
            width: '500px', height: '700px', data: editableProduct
        })
        dialogRef.afterClosed().subscribe((result: CreateProductModels ) => {
            if (result) {
                if (editableProduct) {
                    const upProduct: Product = {
                        ...editableProduct,
                        ...result,
                    }
                    console.log(upProduct);
                    this.store.dispatch(editProduct({product: upProduct}));
                } else {
                    console.log("else");
                    this.store.dispatch(createProduct({product: result }))
                }
            }
        })
    }

    editProduct(editableProduct: Product) {
        this.openDialog(editableProduct)
    }
}
