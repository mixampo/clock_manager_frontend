import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Department} from '../model/department';
import {catchError, exhaustMap, take} from "rxjs/operators";
import {throwError} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private authService: AuthService) {

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

  addDepartment(department: Department) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.post<any>(
          `${this.apiUrl}/departments`, department,
          {
            headers: new HttpHeaders({'Authorization': `Bearer ${user.token}`})
          }
        ).pipe(
          catchError(errorRes => {
            return throwError(errorRes)
          })
        );
      })
    )
  }

  deleteDepartment(id: Number) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http
          .delete<any>(
            `${this.apiUrl}/departments/${id}`,
            {
              headers: new HttpHeaders({'Authorization': `Bearer ${user.token}`})
            }
          );
      })
    );
  }

  updateDepartment(department: Department) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.put<any>(
          `${this.apiUrl}/departments/${department.id}`, department,
          {
            headers: new HttpHeaders({'Authorization': `Bearer ${user.token}`})
          }
        );
      })
    );
  }
}
