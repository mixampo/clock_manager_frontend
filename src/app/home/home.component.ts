import {Component, OnInit} from '@angular/core';
import {Department} from '../model/department';
import {Router} from '@angular/router';
import {DepartmentService} from '../service/department.service';
import {User} from '../model/user';
import {UserService} from '../service/user.service';
import {NgForm} from '@angular/forms';
import {AuthService} from "../service/auth.service";
import {AlertService} from "../service/alert.service";

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
  loading = false;
  userUpdateSuccess = false;
  url = '';

  constructor(private router: Router,
              private departmentService: DepartmentService,
              private userService: UserService,
              private authService: AuthService,
              private alertService: AlertService) {
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

  onSubmitEdittedProfile(form: NgForm) {
    this.alertService.toggleUpdateProfileSuccess();
    this.loading = true;
    if (form.value === this.currUser) {
      console.log('kek')
    } else {
      this.userService.updateCurrentUser(form.value)
        .subscribe(repsonseData => {
          console.log(repsonseData);
          this.loading = false;
          this.userUpdateSuccess = true;
          this.authService.signOutUser();
          this.router.navigate(['/signin'])
        }, errorRes => {
          this.error = errorRes;
          console.log(this.error);
          this.loading = false;
          this.userUpdateSuccess = false;
        });
    }
  }

  onSubmitEdittedProfilePic(form: NgForm) {

  }

  onCancel() {
    this.router.navigate(['/clocking'])
  }

  processFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.url = event.target.result
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}
