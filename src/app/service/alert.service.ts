import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  registrationSuccess: boolean = false;

  constructor() { }

  getRegistrationSuccess(): boolean {
    return this.registrationSuccess;
  }

  toggleRegistrationSuccess(): void {
    this.registrationSuccess = !this.registrationSuccess;
  }

  setRegistrationSuccess(registrationStatus: boolean): void {
    this.registrationSuccess = registrationStatus;
  }
}
