import {Component, OnInit} from '@angular/core';
import {WorkTimeRegistrationService} from '../service/work-time-registration.service';
import {HttpClient} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {DepartmentService} from '../service/department.service';
import {Activity} from '../model/activity';
import {ActivityService} from '../service/activity.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-clocking',
  templateUrl: './clocking.component.html',
  styleUrls: ['./clocking.component.css']
})
export class ClockingComponent implements OnInit {
  activities: Activity[];
  defaultActivity: Activity;

  constructor(private workTimeRegistrationService: WorkTimeRegistrationService, private activityService: ActivityService, private departmentService: DepartmentService, private http: HttpClient) {
  }

  ngOnInit() {
    this.activityService.getActivitiesByDepartmentId()
      .subscribe(activities => {
        this.activities = activities;
        this.defaultActivity = this.activities[0];
      });
  }

  onCreateWorkTimeRegistration(form: NgForm) {
    this.workTimeRegistrationService.addWorkTimeRegistration(form)
      .pipe(first())
      .subscribe(
        responseData => {
          console.log(responseData);
          form.reset()
        }, errorRes => {
          console.log(errorRes);
        }
      );
  }

  onClearFields(form: NgForm) {
    form.reset();
  }

}
