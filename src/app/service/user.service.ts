import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {

  }

  signUpUser(user: User) {
    return this.http.post(this.apiUrl + '/signup', user)
  }

  getAllUsers() {
    this.http.get(this.apiUrl + '/users')
  }
}
