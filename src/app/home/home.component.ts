import {Component, OnInit} from '@angular/core';
import {Department} from '../model/department';
import {Router} from '@angular/router';
import {DepartmentService} from '../service/department.service';
import {User} from '../model/user';
import {UserService} from '../service/user.service';
import {NgForm} from '@angular/forms';
import {AuthService} from '../service/auth.service';
import {AlertService} from '../service/alert.service';

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
        this.defaultDepartment = this.departments.find(x => x.id === this.currUser.department.id);
      }, errorRes => {
        this.error = errorRes;
        console.log(this.error);
      });
    this.currUser = this.userService.getCurrentUser();
  }

  onSubmitEdittedProfile(form: NgForm) {
    this.toggleLoading();
    if (form.value === this.currUser) {
      this.setAlertValues(false, 'No informatio was changed');
    } else {
      this.userService.updateCurrentUser(form.value)
        .subscribe(repsonseData => {
          this.toggleLoading();
          //this.setAlertValues(true, 'Profile updated');
          console.log(repsonseData);
          this.authService.signOutUser();
          this.router.navigate(['signin'], {queryParams: { updated: 'true' } });
        }, errorRes => {
          this.error = errorRes;
          this.toggleLoading();
          this.setAlertValues(false, 'Error while updating profile');
          console.log(this.error);
        });
    }
  }

  onSubmitEdittedProfilePic(form: NgForm) {

  }

  onCancel() {
    this.router.navigate(['/clocking']);
  }

  processFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
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
