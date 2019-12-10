import {User} from "./user";
import {Activity} from "./activity";
import {Department} from "./department";
import {Time} from '@angular/common';

export class WorkTimeRegistration {
  id?: number;
  user: User;
  activity: Activity;
  department: Department;
  workingDayDate: Date;
  workingDayStartTime: Time;
  workingDayEndTime: Time;
  totalWorkingHours: number;

  constructor(user: User, activity: Activity, department: Department, workingDayDate: Date, workingDayStartTime: Time, workingDayEndTime: Time, totalWorkingHours: number, id?: number) {
    this.user = user;
    this.activity = activity;
    this.department = department;
    this.workingDayDate = workingDayDate;
    this.workingDayStartTime = workingDayStartTime;
    this.workingDayEndTime = workingDayEndTime;
    this.totalWorkingHours = totalWorkingHours;
    this.id = id;
  }
}
