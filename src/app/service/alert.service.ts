import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  registrationSuccess: boolean = false;
  updateProfileSuccess: boolean = false;

  constructor() { }

  getRegistrationSuccess(): boolean {
    return this.registrationSuccess;
  }

  getUpdateProfileSuccess() : boolean {
    return this.updateProfileSuccess;
  }

  toggleRegistrationSuccess(): void {
    this.registrationSuccess = !this.registrationSuccess;
  }

  toggleUpdateProfileSuccess(): void {
    this.updateProfileSuccess = !this.updateProfileSuccess;
  }

  setRegistrationSuccess(registrationStatus: boolean): void {
    this.registrationSuccess = registrationStatus;
  }

  setUpdateProfileSuccess(updateProfileSucces: boolean): void {
    this.updateProfileSuccess = updateProfileSucces;
  }
}
