import {Injectable} from '@angular/core';
import {Store, StoreConfig} from '@datorama/akita';
import {Session} from 'inspector';
import {UserModel} from '../../../models/userModel';

export interface UserState {
  user: UserModel;
}

export function createInitialSessionState(): UserState {
  return {
    user: null,
  };
}
export function createSessionState(User: UserModel): UserState{
  return  {
    user: User,
  };
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'session'})
export class UserStore extends Store<UserState> {

  constructor() {
    super(createInitialSessionState());
  }
  login(user: UserModel): void {
    this.update(createSessionState(user));
  }
  /*

  logout() {
    this.update(createInitialSessionState());
  }*/
}
