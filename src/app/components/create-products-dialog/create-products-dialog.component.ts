import {Component, Inject, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatHint, MatInput, MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {Product} from '../../models/productModel';

@Component({
  selector: 'app-create-products-dialog',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatDialogContent,
    MatDialogActions,
    MatButton,

  ],
  templateUrl: './create-products-dialog.component.html',
  styleUrl: './create-products-dialog.component.scss'
})
export class CreateProductsDialogComponent {

  private readonly fb = inject(FormBuilder);
  readonly dialogRef = inject(MatDialogRef<CreateProductsDialogComponent>);
  data = inject<Product>(MAT_DIALOG_DATA);

  public createProductForm: FormGroup = this.fb.group({
    title: [ this.data?.title || "",Validators.required],
    description: [this.data?.description || '',Validators.required],
    price: [this.data?.price || 0, Validators.required,],
    images: [this.data?.image || ["https://placehold.co/600x400"], Validators.required],
    categoryId: [this.data?.categoryId || 1, Validators.required],
  })

  onNoClick() {
    this.dialogRef.close();
  }
  onSubmit() {
    this.dialogRef.close(this.createProductForm.value);
  }

}


