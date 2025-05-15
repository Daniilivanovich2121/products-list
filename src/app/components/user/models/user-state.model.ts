import {User} from './userModel';

export interface UserStateModel {
  isLoading: boolean
  users: User[]
  error: any
}

export const USER_INITIAL_STATE: UserStateModel = {
  isLoading: false,
  users: [],
  error: null
}
