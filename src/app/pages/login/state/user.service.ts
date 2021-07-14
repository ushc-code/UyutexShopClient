import {Injectable} from '@angular/core';
import {UserState, UserStore} from './user.store';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {createUserModel, UserModel} from '../../../models/userModel';
import {catchError, mapTo, tap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {UserQuery} from './user.query';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private authStore: UserStore, private http: HttpClient, private userQuery: UserQuery) {
  }

  registerUser(data: UserModel): any {
    this.http.post('http://localhost:8061/registration', data, {}).pipe(catchError(this.handleError)).subscribe();
    console.log('Пользователь зарегистрирован');
    console.log(data);
  }

  loginUser(data: UserModel): any {
    this.http.post<UserModel>('http://localhost:8061/auth', data).pipe(tap(
      user => {
        console.log('Вошедший пользователь');
        console.log(data);
        /*this.authStore.update(state => {
          state.user = user;
        });*/
      })).subscribe(resp => {
      this.authStore.login(resp);
      console.log(this.userQuery.isAdmin());
      console.log(this.userQuery.getLoggedUser());
    });
  }

  private handleError(error: HttpErrorResponse):
    Observable<never> {
    if (error.error instanceof ErrorEvent
    ) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error} `);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
