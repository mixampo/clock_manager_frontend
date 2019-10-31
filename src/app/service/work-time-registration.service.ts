import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Department} from '../model/department';
import {WorkTimeRegistration} from '../model/workTimeRegistration';

@Injectable({
  providedIn: 'root'
})
export class WorkTimeRegistrationService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getWorkTimeRegistrations() {
    return this.http.get<WorkTimeRegistration[]>(this.apiUrl + '/worktime-registrations')
  }
}
