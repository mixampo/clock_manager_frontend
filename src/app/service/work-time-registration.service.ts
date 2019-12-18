import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {WorkTimeRegistration} from '../model/workTimeRegistration';
import {AuthService} from './auth.service';
import {exhaustMap, take} from 'rxjs/operators';
import {NgForm} from '@angular/forms';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkTimeRegistrationService {
  private apiUrl = 'http://localhost:8080';
  workTimeRegistration: WorkTimeRegistration;
  currWorkTimeRegistration: WorkTimeRegistration;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getWorkTimeRegistrations() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http
          .get<WorkTimeRegistration[]>(
            `${this.apiUrl}/worktime-registrations`,
            {
              headers: new HttpHeaders({'Authorization': `Bearer ${user.token}`}),
              params: new HttpParams().set('userId', user.id.toString())
            }
          );
      })
    );
  }

  getWorkTimeRegistrationsByDate(beginDate: Date, endDate: Date) {
    let reqParams = new HttpParams();
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        reqParams = reqParams.append('userId', user.id.toString());
        reqParams = reqParams.append('beginDate', beginDate.toString());
        reqParams = reqParams.append('endDate', endDate.toString());
        return this.http
          .get<WorkTimeRegistration[]>(
            `${this.apiUrl}/worktime-registrations/dated`,
            {
              headers: new HttpHeaders({'Authorization': `Bearer ${user.token}`}),
              params: reqParams
            }
          );
      })
    );
  }

  addWorkTimeRegistration(formData: NgForm) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        this.workTimeRegistration = new WorkTimeRegistration
        (
          user,
          formData.value['activity'],
          user.department,
          formData.value['workingDayDate'],
          formData.value['workingDayStartTime'],
          formData.value['workingDayEndTime'],
          0
        );
        return this.http
          .post<any>(
            `${this.apiUrl}/worktime-registrations`, this.workTimeRegistration,
            {
              headers: new HttpHeaders({'Authorization': `Bearer ${user.token}`})
            }
          );
      })
    );
  }

  updateWorkTimeRegistration(formData: NgForm, id: number) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        this.currWorkTimeRegistration = new WorkTimeRegistration(
          user,
          formData.value['activity'],
          user.department,
          formData.value['workingDayDate'],
          formData.value['workingDayStartTime'],
          formData.value['workingDayEndTime'],
          0,
          id
        );
        return this.http
          .put<any>(
            `${this.apiUrl}/worktime-registrations/${this.currWorkTimeRegistration.id}`, this.currWorkTimeRegistration,
            {
              headers: new HttpHeaders({'Authorization': `Bearer ${user.token}`})
            }
          );
      })
    );
  }

  deleteWorkTimeRegistration(id: number) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http
          .delete<any>(
            `${this.apiUrl}/worktime-registrations/${id}`,
            {
              headers: new HttpHeaders({'Authorization': `Bearer ${user.token}`})
            }
          );
      })
    );
  }

  orderWorkTimeRegistrationsByDateAsc(workTimeRegistrationsA: WorkTimeRegistration, workTimeRegistrationB: WorkTimeRegistration) {
    if (workTimeRegistrationsA.workingDayDate < workTimeRegistrationB.workingDayDate) {
      return -1;
    }
    if (workTimeRegistrationsA.workingDayDate > workTimeRegistrationB.workingDayDate) {
      return 1;
    }
    return 0;
  }

  orderWorkTimeRegistrationsByDateDesc(workTimeRegistrationsA: WorkTimeRegistration, workTimeRegistrationB: WorkTimeRegistration) {
    if (workTimeRegistrationsA.workingDayDate < workTimeRegistrationB.workingDayDate) {
      return 1;
    }
    if (workTimeRegistrationsA.workingDayDate > workTimeRegistrationB.workingDayDate) {
      return -1;
    }
    return 0;
  }
}
