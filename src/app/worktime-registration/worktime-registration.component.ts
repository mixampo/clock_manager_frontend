import {Component, Input, OnInit} from '@angular/core';
import {WorkTimeRegistration} from '../model/workTimeRegistration';
import {Activity} from '../model/activity';
import {ActivityService} from '../service/activity.service';
import {NgForm} from '@angular/forms';
import {WorkTimeRegistrationService} from '../service/work-time-registration.service';
import {first} from 'rxjs/operators';
import {AlertService} from '../service/alert.service';

@Component({
  selector: 'app-worktime-registration',
  templateUrl: './worktime-registration.component.html',
  styleUrls: ['./worktime-registration.component.css']
})
export class WorktimeRegistrationComponent implements OnInit {
  @Input() worktimeRegistration: WorkTimeRegistration;
  activities: Activity[];
  defaultActivity: Activity;

  constructor(private activityService: ActivityService, private workTimeRegistrationService: WorkTimeRegistrationService, private alertService: AlertService) {
  }

  ngOnInit() {
    this.activityService.getActivitiesByDepartmentId()
      .subscribe(activities => {
        this.activities = activities;
        this.defaultActivity = this.activities.find(x => x.name === this.worktimeRegistration.activity.name);
      });
  }

  onUpdateWorkTimeRegistration(form: NgForm) {
    this.alertService.setUpdateWorkTimeRegistrationSuccess(true);
    this.workTimeRegistrationService.updatedSubject.next(true);
    this.workTimeRegistrationService.updateWorkTimeRegistration(form, this.worktimeRegistration.id)
      .pipe(first())
      .subscribe(
        responseData => {
          console.log(responseData);
        }, errorRes => {
          console.log(errorRes);
        }
      );
  }

}
