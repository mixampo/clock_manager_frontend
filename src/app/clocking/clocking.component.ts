import { Component, OnInit } from '@angular/core';
import {WorkTimeRegistrationService} from '../service/work-time-registration.service';
import {HttpClient} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {DepartmentService} from '../service/department.service';
import {Activity} from '../model/activity';
import {Department} from '../model/department';
import {ActivityService} from '../service/activity.service';

@Component({
  selector: 'app-clocking',
  templateUrl: './clocking.component.html',
  styleUrls: ['./clocking.component.css']
})
export class ClockingComponent implements OnInit {
  activities: Activity[];
  defaultActivity: Department;

  constructor(private workTimeRegistrationService: WorkTimeRegistrationService, private activityService: ActivityService, private departmentService: DepartmentService, private http: HttpClient) { }

  ngOnInit() {
    this.activityService.getActivitiesByDepartmentId()
      .subscribe(activities => {
        this.activities = activities
      });
  }

  onAddWorkTimeRegistration(form: NgForm) {

  }

}
