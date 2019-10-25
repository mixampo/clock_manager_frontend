import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../service/user.service';
import {delay, first} from 'rxjs/operators';
import {Router} from '@angular/router';
import {DepartmentService} from '../service/department.service';
import {Department} from '../model/department';
import {AlertService} from '../service/alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  departments: Department[];
  defaultDepartment: Department;
  loading = false;

  constructor(private userService: UserService, private departmentService: DepartmentService, private alertService: AlertService, private router: Router) { }

  ngOnInit() {
    this.departmentService.getDepartments()
      .subscribe(departments => {
        this.departments = departments;
        this.defaultDepartment = this.departments[0]
      });
  }

  onSignup(form: NgForm) {
    this.loading = true;
    console.log(form.value);
    this.userService.signUpUser(form.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successfull', true);
          this.router.navigate(['/signin']);
          form.reset();
      })
  }

}
