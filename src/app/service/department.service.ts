import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Department} from '../model/department';
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {

  }

  getDepartments() {
    return this.http
      .get<Department[]>(
        `${this.apiUrl}/departments`
      ).pipe(
        catchError(errorRes => {
          return throwError(errorRes)
        })
      )
  }
}
