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

  constructor(private authService: AuthService, private departmentService: DepartmentService, private alertService: AlertService, private router: Router) { }

  ngOnInit() {
    this.alertService.setRegistrationSuccess(false);
    this.departmentService.getDepartments()
      .subscribe(departments => {
        this.departments = departments;
        this.defaultDepartment = this.departments[0]
      });
  }

  onSignup(form: NgForm) {
    this.loading = true;
    this.alertService.toggleRegistrationSuccess();

    this.authService.signUpUser(form.value)
      .pipe(first())
      .subscribe(
        responseData => {
          console.log(responseData);
          this.router.navigate(['/signin']);
          this.loading = false;
      }, error => {
          this.loading = false;
          this.error = error;
          console.log(error);
          form.reset();
      });
  }
}
