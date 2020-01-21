import {Component, OnInit} from '@angular/core';
import {ActivityService} from '../service/activity.service';
import {Activity} from '../model/activity';
import {AlertService} from '../service/alert.service';
import {NgForm} from '@angular/forms';
import {Department} from '../model/department';
import {DepartmentService} from '../service/department.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  activities: Activity[];
  activitiesFiltered: Activity[];
  departments: Department[];
  defaultDepartment: Department;
  loading = false;
  error = null;
  connectionError = null;

  constructor(private activityService: ActivityService, private alertService: AlertService, private departmentService: DepartmentService) {
  }

  ngOnInit() {
    this.getAllActivities();
    this.departmentService.getDepartments()
      .subscribe(
        departments => {
          this.departments = departments;
          this.defaultDepartment = departments[0];
        });
    this.alertService.successSubject.subscribe(isSuccess => {
      this.loading = isSuccess;
      this.getAllActivities();
    });
    this.alertService.failureSubject.subscribe(isFailure => {
      this.loading = isFailure;
      this.getAllActivities();
    });
  }

  getAllActivities() {
    this.activityService.getActivities()
      .subscribe(activities => {
        this.activities = activities;
        this.activitiesFiltered = activities;
        this.activities.sort(this.activityService.orderActivitiesAlphabatically);
        this.activitiesFiltered.sort(this.activityService.orderActivitiesAlphabatically);
      }, errorRes => {
        this.connectionError = errorRes;
        console.log(this.connectionError);
      });
  }

  onCreateActivity(form: NgForm) {
    this.loading = true;
    this.error = null;

    this.activityService.addActivity(form.value)
      .pipe(first())
      .subscribe(
        responseData => {
          this.loading = false;
          this.setAlertValues(true, "Add succesfull");
          console.log(responseData);
        }, errorRes => {
          this.loading = false;
          this.setAlertValues(true, "Error while adding activity");
          this.error = errorRes;
          console.log(this.error);
        });
  }

  //Function for search bar
  assignCopy() {
    this.activitiesFiltered = Object.assign([], this.activities);
  }

  filterList(value) {
    if (!value) {
      this.assignCopy();
    }
    this.activitiesFiltered = Object.assign([], this.activities).filter(
      item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
  }

  setAlertValues(status: boolean, message: string) {
    this.alertService.successSubject.next(status);
    this.alertService.failureSubject.next(!status);
    this.alertService.messageSubject.next(message);
  }
}
