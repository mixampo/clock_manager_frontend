import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  registrationSuccess: boolean = false;
  updateProfileSuccess: boolean = false;
  updateWorkTimeRegistrationSuccess: boolean = false;

  constructor() { }

  getRegistrationSuccess(): boolean {
    return this.registrationSuccess;
  }

  getUpdateProfileSuccess() : boolean {
    return this.updateProfileSuccess;
  }

  getUpdateWorkTimeRegistrationSuccess(): boolean {
    return this.updateWorkTimeRegistrationSuccess;
  }

  setUpdateWorkTimeRegistrationSuccess(value: boolean) {
    this.updateWorkTimeRegistrationSuccess = value;
  }

  setRegistrationSuccess(registrationStatus: boolean): void {
    this.registrationSuccess = registrationStatus;
  }

  setUpdateProfileSuccess(updateProfileSucces: boolean): void {
    this.updateProfileSuccess = updateProfileSucces;
  }

  toggleRegistrationSuccess(): void {
    this.registrationSuccess = !this.registrationSuccess;
  }

  toggleUpdateProfileSuccess(): void {
    this.updateProfileSuccess = !this.updateProfileSuccess;
  }

  toggleUpdateWorkTimeRegistrationSuccess(): void {
    this.updateWorkTimeRegistrationSuccess = !this.updateWorkTimeRegistrationSuccess;
  }

}
