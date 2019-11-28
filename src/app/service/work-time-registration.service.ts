import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {WorkTimeRegistration} from '../model/workTimeRegistration';
import {AuthService} from './auth.service';
import {exhaustMap, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkTimeRegistrationService {
  private apiUrl = 'http://localhost:8080';

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

  orderWorkTimeRegistrationsByDate(workTimeRegistrationsA: WorkTimeRegistration, workTimeRegistrationB: WorkTimeRegistration) {
    if (workTimeRegistrationsA.workingDayDate < workTimeRegistrationB.workingDayDate) {
      return -1;
    }
    if (workTimeRegistrationsA.workingDayDate > workTimeRegistrationB.workingDayDate) {
      return 1;
    }
    return 0;
  }
}
