import {User} from "./user";
import {Activity} from "./activity";
import {Department} from "./department";
import {Time} from '@angular/common';

export class WorkTimeRegistration {
  user: User;
  activity: Activity;
  department: Department;
  workingDayDate: Date;
  workingDayStartTime: Time;
  workingDayEndTime: Time;
  totalWorkingHours: number;
}
