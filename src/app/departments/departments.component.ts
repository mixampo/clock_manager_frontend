import {Component, OnInit} from '@angular/core';
import {DepartmentService} from "../service/department.service";
import {NgForm} from "@angular/forms";
import {first} from "rxjs/operators";
import {Department} from "../model/department";
import {AlertService} from "../service/alert.service";

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  loading = false;
  error = null;
  departments: Department[];
  connectionError: null;
  editMode = false;
  currentDepartment: Department;

  constructor(private departmentService: DepartmentService, private alertService: AlertService) {
  }

  ngOnInit() {
    this.getAllDepartments();
  }

  onAddDepartment(form: NgForm) {
    this.loading = true;
    this.error = null;

    this.departmentService.addDepartment(form.value)
      .pipe(first())
      .subscribe(
        responseData => {
          this.setAlertValues(true, 'Add successful');
          console.log(responseData);
          this.loading = false;
          this.getAllDepartments()
        }, errorRes => {
          this.setAlertValues(false, 'Error while adding');
          this.loading = false;
          this.error = errorRes;
          console.log(errorRes);
          form.reset();
        }
      )
  }

  onDeleteDepartment(department: Department) {
    this.loading = true;
    this.error = null;

    this.departmentService.deleteDepartment(department.id)
      .pipe(first())
      .subscribe(
        responseData => {
          this.setAlertValues(true, 'Delete successful');
          console.log(responseData);
          this.loading = false;
          this.getAllDepartments();
        }, errorRes => {
          this.setAlertValues(false, 'Error while deleting department');
          this.loading = false;
          this.error = errorRes;
          console.log(this.error)
        }
      );
  }

  onEditDepartment(form: NgForm) {
    this.loading = true;
    this.error = null;
    this.currentDepartment.name = form.value['name'];
    console.log(this.currentDepartment);

    this.departmentService.updateDepartment(this.currentDepartment)
      .pipe(first())
      .subscribe(
        responseData => {
          this.setAlertValues(true, 'Update successful');
          console.log(responseData);
          this.loading = false;
          this.editMode = false;
          this.getAllDepartments();
        }, errorRes => {
          this.setAlertValues(false, 'Error while updating department');
          this.loading = false;
          this.error = errorRes;
          console.log(this.error)
        }
      )
  }

  setEditMode(department: Department) {
    this.currentDepartment = department;
    this.editMode = true
  }


  getAllDepartments() {
    this.departmentService.getDepartments()
      .subscribe(departments => {
        this.departments = departments;
      }, errorRes => {
        this.connectionError = errorRes;
        console.log(this.connectionError)
      });
  }

  setAlertValues(status: boolean, message: string) {
    this.alertService.successSubject.next(status);
    this.alertService.failureSubject.next(!status);
    this.alertService.messageSubject.next(message);
  }

}
