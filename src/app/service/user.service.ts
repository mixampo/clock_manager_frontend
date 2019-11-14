import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {exhaustMap, take} from 'rxjs/operators';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080';
  user: User;

  constructor(private http: HttpClient, private authService: AuthService) {

  }

  getCurrentUser() {
    return this.authService.user.value;
  }

  updateCurrentUser(user: User) {

  }
}
