import {Component, inject, OnInit} from '@angular/core';
import {UsersStore} from '../store/users.store';
import {LetDirective, PushPipe} from '@ngrx/component';
import {JsonPipe} from '@angular/common';
import {MatProgressBar} from '@angular/material/progress-bar';
import {ProductsCardComponent} from '../../products/products-card/products-card.component';
import {UserCardComponent} from '../user-card/user-card.component';
import {User} from '../models/userModel';

@Component({
  selector: 'app-user-list',
  imports: [
    LetDirective,
    JsonPipe,
    MatProgressBar,
    ProductsCardComponent,
    PushPipe,
    UserCardComponent
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  providers:[UsersStore]
})
export default class UserListComponent implements OnInit {
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


}
