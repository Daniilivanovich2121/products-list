import {inject, Injectable} from '@angular/core';
import {USER_INITIAL_STATE, UserStateModel} from '../models/user-state.model';
import {ComponentStore} from '@ngrx/component-store';
import {ApiService} from '../../../core/api.service';
import {CreateUserModels, User} from '../models/userModel';
import {tapResponse} from '@ngrx/operators';
import {Observable} from 'rxjs';
import {API_URL} from '../../../core/api-url';

@Injectable()
export class UsersStore extends ComponentStore<UserStateModel> {
  private readonly apiService: ApiService = inject(ApiService);

  users$: Observable<User[]> = this.select((state) => state.users)
  isLoading$: Observable<boolean> = this.select((state) => state.isLoading)
  error$: Observable<any> = this.select((state) => state.error)

  constructor() {
    super(USER_INITIAL_STATE);
  }

  public getUsers() {
    this.patchState({isLoading: true, error: null});
    this.effect(() => this.apiService.get<User[]>("users").pipe(
      tapResponse({
        next: (users) => this.patchState({users: users}),
        error: error => this.patchState({error: error}),
        finalize: () => this.patchState({isLoading: false}),
      })
    ))

  }

  public createUser(user: CreateUserModels) {
    console.log(user);
    this.patchState({isLoading: true, error: null});
    this.effect(() => this.apiService.post<User, CreateUserModels>("users/", user).pipe(
      tapResponse({
        next: (users) => this.patchState({users: [...this.get().users, users]}),
        error: (error) => this.patchState({error: error}),
        finalize: () => this.patchState({isLoading: false})
      })
    ));
  }


  public readonly deleteUser = this.updater((state, userId: number) => {
    return {
      ...state,
      users: state.users.filter(user => user.id !== userId),
      isLoading: false,
      error: null
    };
  });

  public editUser(user: User) {
    this.patchState({isLoading: true, error: null});
    this.effect(() => this.apiService.put<User, User>(`users/${user.id}`, user).pipe(
      tapResponse({
          next: (editableUser) => {
            const newUsers = this.get().users.map(user =>
              editableUser.id === user.id ? editableUser : user)
            this.patchState({users: newUsers});
          },
          error: (error) => this.patchState({error: error}),
          finalize: () => this.patchState({isLoading: false})
        }
      )
    ))
  }

}
