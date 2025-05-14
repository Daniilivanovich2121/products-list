import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInput,} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {MatButton,} from '@angular/material/button';
import {Product} from '../../models/productModel';
import {MatOption, MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-create-products-dialog',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatSelect,
    MatOption,
  ],
  templateUrl: './create-products-dialog.component.html',
  styleUrl: './create-products-dialog.component.scss'
})
export class CreateProductsDialogComponent {
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly dialogRef: MatDialogRef<any, any> = inject(MatDialogRef<CreateProductsDialogComponent>);
  private readonly data: Product = inject<Product>(MAT_DIALOG_DATA);

  public createProductForm: FormGroup = this.fb.group({
    title: [this.data?.title || "", Validators.required],
    description: [this.data?.description || '', Validators.required],
    price: [this.data?.price || 0, Validators.required,],
    images: [this.data?.images || ["https://placehold.co/600x400"], Validators.required],
    categoryId: [this.data?.categoryId || 1, Validators.required],
  })

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    this.dialogRef.close(this.createProductForm.value);
  }

}


