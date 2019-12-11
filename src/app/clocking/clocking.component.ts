import {Component, OnInit} from '@angular/core';
import {WorkTimeRegistrationService} from '../service/work-time-registration.service';
import {HttpClient} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {DepartmentService} from '../service/department.service';
import {Activity} from '../model/activity';
import {ActivityService} from '../service/activity.service';
import {first} from 'rxjs/operators';
import {WorkTimeRegistration} from '../model/workTimeRegistration';
import {AlertService} from '../service/alert.service';

@Component({
  selector: 'app-clocking',
  templateUrl: './clocking.component.html',
  styleUrls: ['./clocking.component.css']
})
export class ClockingComponent implements OnInit {
  activities: Activity[];
  defaultActivity: Activity;
  workTimeRegistrations: WorkTimeRegistration[];
  loading: boolean = false;
  updateSuccess: boolean = false;

  constructor(private workTimeRegistrationService: WorkTimeRegistrationService, private activityService: ActivityService, private alertService: AlertService) {}

  ngOnInit() {
    this.activityService.getActivitiesByDepartmentId()
      .subscribe(activities => {
        this.activities = activities;
        this.defaultActivity = this.activities[0];
      });
    this.onGetAllWorkTimeRegistrations();
    this.workTimeRegistrationService.updatedSubject.subscribe(isUpdated => {
      this.loading = isUpdated;
      this.updateSuccess = this.alertService.getUpdateWorkTimeRegistrationSuccess();
      this.onGetAllWorkTimeRegistrations();
    });
  }

  onCreateWorkTimeRegistration(form: NgForm) {
    this.workTimeRegistrationService.addWorkTimeRegistration(form)
      .pipe(first())
      .subscribe(
        responseData => {
          console.log(responseData);
          form.reset();
          this.onGetAllWorkTimeRegistrations();
        }, errorRes => {
          console.log(errorRes);
        }
      );
  }

  onClearFields(form: NgForm) {
    form.reset();
  }

  onGetAllWorkTimeRegistrations() {
    this.workTimeRegistrationService.getWorkTimeRegistrations()
      .subscribe(workTimeRegistrations => {
        this.workTimeRegistrations = workTimeRegistrations;
        this.workTimeRegistrations.sort(this.workTimeRegistrationService.orderWorkTimeRegistrationsByDateDesc);
        this.loading = false;
      });
  }
}
