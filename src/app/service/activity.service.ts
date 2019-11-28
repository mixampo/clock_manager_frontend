import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Activity} from '../model/activity';
import {exhaustMap, take} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getActivitiesByDepartmentId() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http
          .get<Activity[]>(
            `${this.apiUrl}/activities`,
            {
              headers: new HttpHeaders({'Authorization': `Bearer ${user.token}`}),
              params: new HttpParams().set('departmentId', user.department.id.toString())
            }
          );
      })
    );
  }
}
