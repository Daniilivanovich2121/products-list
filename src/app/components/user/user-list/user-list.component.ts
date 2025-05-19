import {Component, inject, OnInit} from '@angular/core';
import {UsersStore} from '../store/users.store';
import {LetDirective, PushPipe} from '@ngrx/component';
import {JsonPipe} from '@angular/common';
import {MatProgressBar} from '@angular/material/progress-bar';
import {ProductsCardComponent} from '../../products/products-card/products-card.component';
import {UserCardComponent} from '../user-card/user-card.component';
import {CreateUserModels, User} from '../models/userModel';
import {CreateUserDialogComponent} from '../create-user-dialog/create-user-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';


@Component({
  selector: 'app-user-list',
  imports: [
    LetDirective,
    JsonPipe,
    MatProgressBar,
    ProductsCardComponent,
    PushPipe,
    UserCardComponent,
    MatButton,
    MatButton
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  providers: [UsersStore]
})
export default class UserListComponent implements OnInit {
  private readonly dialog = inject(MatDialog);
  private readonly usersStore = inject(UsersStore);
  users$ = this.usersStore.users$
  isLoading$ = this.usersStore.isLoading$;
  error$ = this.usersStore.error$;

  ngOnInit() {
    this.init()
  }

  init(): void {
    this.usersStore.getUsers()
  }

  deleteUser(user: User): void {
    this.usersStore.deleteUser(user.id)
  }

  editUser(user: User): void {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      width: '500px',
      height: '700px',
      data: {user}
    });
    dialogRef.afterClosed().subscribe((result: CreateUserModels) => {
      if (result) {
        const editUser: User = {
          ...user,
          ...result
        }
        this.usersStore.editUser(editUser)
      }
    })
  }


  openCreateUserDialog(): void {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      width: '500px',
      height: '700px',
      data: null
    });
    dialogRef.afterClosed().subscribe((result: CreateUserModels): void => {
      if (result) {
        this.usersStore.createUser(result);
      }
    });
  }


}
