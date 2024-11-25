import {Injectable} from '@angular/core';
import {User} from '../model/user';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Department} from '../model/department';

export interface AuthResponseData {
  token: string;
  user: User
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private apiUrl = 'http://localhost:8080';
  isLoggedIn = false;
  tokenValidity: number;

  constructor(private http: HttpClient) {
  }

  signUpUser(user: User) {
    user.role = 'user';
    return this.http.post<any>(
      `${this.apiUrl}/signup`, user
    ).pipe(
      catchError(errorRes => {
        return throwError(errorRes)
      })
    );
  }

  signInUser(user: User) {
    return this.http.post<AuthResponseData>(
      `${this.apiUrl}/auth`, user
    ).pipe(
      catchError(errorRes => {
        return throwError(errorRes);
      }), tap(resData => {
        const user = new User(
          resData.user.id,
          resData.token,
          resData.user.firstname,
          resData.user.lastname,
          resData.user.username,
          resData.user.email,
          resData.user.department,
          resData.user.role
        );
        this.tokenValidity = Date.now() + 3600000;
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
      })
    );
  }

  signOutUser() {
    this.user.next(null);
    localStorage.removeItem('userData');
  }

  autoSignIn() {

    if (this.tokenValidity < Date.now()) {
      this.signOutUser();
      return;
    }

    const userData: {
      id: number;
      _token: string;
      firstname: string;
      lastname: string;
      username: string;
      email: string;
      department: Department;
      role: string
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User
    (
      userData.id,
      userData._token,
      userData.firstname,
      userData.lastname,
      userData.username,
      userData.email,
      userData.department,
      userData.role
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }
}
