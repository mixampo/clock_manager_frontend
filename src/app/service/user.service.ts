import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {catchError, exhaustMap, take} from 'rxjs/operators';
import {User} from '../model/user';
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private authService: AuthService) {

  }

  getCurrentUser() {
    return this.authService.user.value;
  }

  updateCurrentUser(user: User) {
    user.id = this.getCurrentUser().id;
    return this.http
      .put<any>(
        `${this.apiUrl}/users`, user,
        {
          headers: new HttpHeaders({'Authorization': `Bearer ${this.getCurrentUser().token}`})
        }
      ).pipe(
        catchError(errorRes => {
          return throwError(errorRes)
        })
      );
  }
}
