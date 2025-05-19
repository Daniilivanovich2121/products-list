import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from '../models/userModel';
import {CurrencyPipe} from '@angular/common';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle, MatCardTitle
} from '@angular/material/card';
import {MatButton, MatFabButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {Product} from '../../products/models/productModel';

@Component({
  selector: 'app-user-card',
  imports: [
    CurrencyPipe,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatCardSubtitle,
    MatCardTitle,
    MatFabButton,
    MatIcon,
    MatIconButton,
    MatTooltip
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() userDelete = new EventEmitter<User>();
  @Output() editUserEvent = new EventEmitter<User>();


  public deleteUser(user: User): void {
    this.userDelete.emit(user);
  }

  public editUser(user: User) {
    this.editUserEvent.emit(user);
  }
}
