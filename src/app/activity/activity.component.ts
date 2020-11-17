import {Component, Input, OnInit} from '@angular/core';
import {DepartmentService} from '../service/department.service';
import {Department} from '../model/department';
import {Activity} from '../model/activity';
import {NgForm} from '@angular/forms';
import {ActivityService} from '../service/activity.service';
import {first} from 'rxjs/operators';
import {AlertService} from '../service/alert.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  @Input() activity: Activity;
  departments: Department[];
  defaultDepartment: Department;
  connectionError = null;
  error = null;

  constructor(private departmentService: DepartmentService, private activityService: ActivityService, private alertService: AlertService) {
  }

  ngOnInit() {
    this.departmentService.getDepartments()
      .subscribe(departments => {
        this.departments = departments;
        this.defaultDepartment = this.departments.find(x => x.name === this.activity.department.name);
      }, errorRes => {
        this.connectionError = errorRes;
        console.log(this.connectionError);
      });
  }

  onUpdateActivity(form: NgForm) {
    this.error = null;

    this.activityService.updateActivity(form.value, this.activity.id)
      .pipe(first())
      .subscribe(
        responseData => {
          this.setAlertValues(true, 'Update successful');
          console.log(responseData);
        }, errorRes => {
          this.error = errorRes;
          this.setAlertValues(false, 'Error while updating activity');
          console.log(errorRes);
        }
      );
  }

  onDeleteActivity() {
    this.error = null;

    this.activityService.deleteActivity(this.activity.id)
      .pipe(first())
      .subscribe(
        responseData => {
          this.setAlertValues(true, 'Delete successfull');
          console.log(responseData);
        }, errorRes => {
          this.setAlertValues(false, 'Error while deleting activity');
          this.error = errorRes;
          console.log(this.error);
        }
      );
  }

  setAlertValues(status: boolean, message: string) {
    this.alertService.successSubject.next(status);
    this.alertService.failureSubject.next(!status);
    this.alertService.messageSubject.next(message);
  }

}
