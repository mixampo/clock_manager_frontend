import {Component, OnInit} from '@angular/core';
import {AppRoutingModule} from '../app-routing.module';
import {Department} from '../model/department';
import {Router} from '@angular/router';
import {DepartmentService} from '../service/department.service';
import {User} from '../model/user';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  departments: Department[];
  defaultDepartment: Department;
  error = null;
  currUser: User;

  constructor(private router: Router, private departmentService: DepartmentService, private userService: UserService) {
  }

  ngOnInit() {
    this.departmentService.getDepartments()
      .subscribe(departments => {
        this.departments = departments;
        this.defaultDepartment = this.departments[0];
      }, errorRes => {
        this.error = errorRes;
        console.log(this.error);
      });
    this.currUser = this.userService.getCurrentUser();
  }

}
