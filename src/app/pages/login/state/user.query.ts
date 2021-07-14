import {Injectable} from '@angular/core';
import {UserState, UserStore} from './user.store';
import {Query} from '@datorama/akita';
import {UserModel} from '../../../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserQuery extends Query<UserState> {
  /*isLoggedIn$ = this.select((state) => state != null);
  name$ = this.select((state) => state.user);*/

  constructor(protected store: UserStore) {
    super(store);
  }

  isLoggedIn(): boolean {
    return this.getValue().user != null;
  }

  getLoggedUser(): UserModel {
    return this.getValue().user;
  }
  getLoggedUserRoles(): [string] {
    return this.getValue().user.roles;
  }
  isAdmin(): boolean {
    let flag = false;
    this.getLoggedUserRoles().map(role => {
      if (role === 'ROLE_ADMIN') {
        console.log(role.valueOf());
        flag = true;
      }
    });
    return flag;
  }
}
