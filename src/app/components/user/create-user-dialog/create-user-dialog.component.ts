import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {CreateUserModels, User} from '../models/userModel';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatOption, MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-create-user-dialog',
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatFormField,
    MatOption
  ],
  templateUrl: './create-user-dialog.component.html',
  styleUrl: './create-user-dialog.component.scss'
})
export class CreateUserDialogComponent implements OnInit {
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly dialogRef: MatDialogRef<any, any> = inject(MatDialogRef<CreateUserDialogComponent>);
  private readonly data = inject(MAT_DIALOG_DATA);

  public createUserForm = this.fb.group({
    name: ["", [Validators.required]],
    password: ['', [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    avatar: ["https://picsum.photos/800", [Validators.required]],
  });

  ngOnInit() {
    if (this.data) {
      this.createUserForm.patchValue({
        name: this.data.name,
        password: this.data.password,
        email: this.data.email,
        avatar: this.data.avatar
      });
    }
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    this.dialogRef.close(this.createUserForm.value);
  }
}
