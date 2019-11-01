import { Injectable } from '@angular/core';
import {User} from '../model/user';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  signUpUser(user: User) {
    return this.http
      .post(
        this.apiUrl + '/signup', user
      )
  }

  //TODO Login verder uitwerken
  signInUser(user: User) {
    return this.http
      .post(
        this.apiUrl + '/auth', user
      )
  }
}
