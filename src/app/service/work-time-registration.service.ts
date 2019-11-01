import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {WorkTimeRegistration} from '../model/workTimeRegistration';

@Injectable({
  providedIn: 'root'
})
export class WorkTimeRegistrationService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getWorkTimeRegistrations(id: number) {
    return this.http
      .get<WorkTimeRegistration[]>(
        this.apiUrl + '/worktime-registrations',
        {
          params: new HttpParams().set("userId", id.toString())
        }
      )
  }
}
