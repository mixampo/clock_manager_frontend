import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Activity} from '../model/activity';
import {exhaustMap, take} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {WorkTimeRegistration} from '../model/workTimeRegistration';
import {Department} from '../model/department';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private apiUrl = 'http://localhost:8080';
  activity: Activity;
  currActivity: Activity;

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

  getActivities() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http
          .get<Activity[]>(
            `${this.apiUrl}/activities/all`,
            {
              headers: new HttpHeaders({'Authorization': `Bearer ${user.token}`}),
            }
          );
      })
    );
  }

  addActivity(activity: Activity) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http
          .post<any>(
            `${this.apiUrl}/activities`, activity,
            {
              headers: new HttpHeaders({'Authorization': `Bearer ${user.token}`}),
            }
          );
      })
    );
  }

  updateActivity(activity: Activity, id: Number) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        activity.id = id;
        return this.http
          .put<any>(
            `${this.apiUrl}/activities/${id}`, activity,
            {
              headers: new HttpHeaders({'Authorization': `Bearer ${user.token}`})
            }
          );
      })
    );
  }

  deleteActivity(id: Number) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http
          .delete<any>(
            `${this.apiUrl}/activities/${id}`,
            {
              headers: new HttpHeaders({'Authorization': `Bearer ${user.token}`})
            }
          );
      })
    );
  }

  orderActivitiesAlphabatically(activityA: Activity, activityB: Activity) {
    if (activityA.department.name < activityB.department.name) {
      return -1;
    }
    if (activityA.department.name > activityB.department.name) {
      return 1;
    }
    return 0;
  }
}
