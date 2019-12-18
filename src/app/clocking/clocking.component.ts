import {Component, OnInit} from '@angular/core';
import {WorkTimeRegistrationService} from '../service/work-time-registration.service';
import {NgForm} from '@angular/forms';
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

  constructor(private workTimeRegistrationService: WorkTimeRegistrationService, private activityService: ActivityService, private alertService: AlertService) {
  }

  ngOnInit() {
    this.activityService.getActivitiesByDepartmentId()
      .subscribe(activities => {
        this.activities = activities;
        this.defaultActivity = this.activities[0];
      });
    this.onGetAllWorkTimeRegistrations();
    this.alertService.successSubject.subscribe(isSuccess => {
      this.loading = isSuccess;
      this.onGetAllWorkTimeRegistrations();
    });
    this.alertService.failureSubject.subscribe(isFailure => {
      this.loading = isFailure;
      this.onGetAllWorkTimeRegistrations();
    });
  }

  onCreateWorkTimeRegistration(form: NgForm) {
    this.workTimeRegistrationService.addWorkTimeRegistration(form)
      .pipe(first())
      .subscribe(
        responseData => {
          this.toggleLoading();
          form.reset();
          this.setAlertValues(true, 'Add succesful');
          this.onGetAllWorkTimeRegistrations();
          console.log(responseData);
        }, errorRes => {
          this.toggleLoading();
          form.reset();
          this.setAlertValues(false, 'Error while adding entry');
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

  setAlertValues(status: boolean, message: string) {
    this.alertService.successSubject.next(status);
    this.alertService.failureSubject.next(!status);
    this.alertService.messageSubject.next(message);
  }

  toggleLoading() {
    this.loading = !this.loading;
  }
}
