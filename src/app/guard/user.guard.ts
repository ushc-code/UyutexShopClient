import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../pages/login/state/user.service';
import {UserQuery} from '../pages/login/state/user.query';

@Injectable()
export class UserGuard
  implements CanActivate, CanActivateChild {
  constructor(
    private userQuery: UserQuery
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.userQuery.isLoggedIn();
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.canActivate(next, state);
  }
}
