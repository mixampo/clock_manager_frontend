import {Injectable} from '@angular/core';
import {User} from '../model/user';
import {HttpClient} from '@angular/common/http';
import {Subject, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";

export interface AuthResponseData {
  token: string;
  user: User
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new Subject<User>();
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  signUpUser(user: User) {
    return this.http.post<any>(
      this.apiUrl + '/signup', user
    ).pipe(
      catchError(errorRes => {
        return throwError(errorRes)
      })
    );
  }

  signInUser(user: User) {
    return this.http.post<AuthResponseData>(
      this.apiUrl + '/auth', user
    ).pipe(
      catchError(errorRes => {
        return throwError(errorRes)
      }), tap(resData => {
        const user = new User(
          resData.user.id,
          resData.token,
          resData.user.firstname,
          resData.user.lastname,
          resData.user.username,
          resData.user.email,
          resData.user.department
        );
        console.log(user);
        this.user.next(user);
      })
    );
  }
}
