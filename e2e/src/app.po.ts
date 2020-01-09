import { browser } from 'protractor';
import {Activity} from "../../src/app/model/activity";
import {Department} from "../../src/app/model/department";
import {Time} from "@angular/common";

export class AppPage {
  navigateTo(path: string) {
    if (path === '') {
      return browser.get(browser.baseUrl) as Promise<any>;
    } else {
      return browser.get(browser.baseUrl + path) as Promise<any>;
    }
  }
}

export class User {
  username: string;
  password: string;
}

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
