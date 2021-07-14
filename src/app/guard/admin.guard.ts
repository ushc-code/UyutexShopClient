import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild, CanDeactivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment, UrlTree
} from '@angular/router';
import {UserQuery} from '../pages/login/state/user.query';
import {Observable} from 'rxjs';

@Injectable()
export class AdminGuard
  implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private userQuery: UserQuery,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.userQuery.getLoggedUser()) {
      return this.userQuery.isAdmin();
    }
    else { return false; }
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.canActivate(next, state);
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userQuery.isAdmin();
  }

}
