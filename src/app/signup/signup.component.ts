import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../service/user.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DepartmentService } from '../service/department.service';
import { Department } from '../model/department';
import {AlertService} from '../service/alert.service';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  departments: Department[];
  defaultDepartment: Department;
  loading = false;
  error = null;
  connectionError = null;

  constructor(private authService: AuthService, private departmentService: DepartmentService, private alertService: AlertService, private router: Router) { }

  ngOnInit() {
    this.departmentService.getDepartments()
      .subscribe(departments => {
        this.departments = departments;
        this.defaultDepartment = this.departments[0]
      }, errorRes => {
        this.connectionError = errorRes;
        console.log(this.connectionError)
      });
  }

  onSignup(form: NgForm) {
    this.loading = true;
    this.error = null;

    this.authService.signUpUser(form.value)
      .pipe(first())
      .subscribe(
        responseData => {
          console.log(responseData);
          this.router.navigate(['signin'], {queryParams: { registered: 'true' } });
          this.loading = false;
      }, errorRes => {
          this.loading = false;
          this.error = errorRes;
          console.log(errorRes);
          form.reset();
      });
  }
}
