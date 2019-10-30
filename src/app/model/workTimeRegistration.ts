import {User} from "./user";
import {Activity} from "./activity";
import {Time} from "@angular/common";
import {Department} from "./department";

export class WorkTimeRegistration {
  user: User;
  activity: Activity;
  department: Department;
  workingDayDate: Date;
  startTime: Date;
  endTime: Date;
  totalWorkingHours: number;
}
