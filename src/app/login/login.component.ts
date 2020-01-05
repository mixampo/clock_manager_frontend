import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AlertService} from '../service/alert.service';
import {AuthService} from '../service/auth.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error = null;
  loading: boolean = false;
  success: boolean = false;
  failure: boolean = false;
  message: string;
  queryParams: ParamMap;

  constructor(private alertService: AlertService, private authService: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParamMap
      .subscribe(queryParams => {
        this.queryParams = queryParams;
        if (this.queryParams.get('updated')) {
          if (this.queryParams.get('updated') === 'true') {
            this.setAlertValues(true, 'Profile updated re-login required');
          } else {
            this.setAlertValues(false, 'Profile could not be updated');
          }
        } else if (this.queryParams.get('registered')) {
          if (this.queryParams.get('registered') === 'true') {
            this.setAlertValues(true, 'Registration successful');
          } else {
            this.setAlertValues(false, 'Profile could not be created');
          }
        }
      });
  }

  onSignIn(form: NgForm) {
    this.loading = true;
    this.error = null;

    this.authService.signInUser(form.value)
      .subscribe(resData => {
        this.loading = false;
        console.log(resData);
        this.router.navigate(['/profile']);
      }, error => {
        this.error = error;
        this.loading = false;
        form.reset();
        this.setAlertValues(false, 'Wrong credentials provided, please try again');
        console.log(error);
      });
  }

  setAlertValues(status: boolean, message: string) {
    this.success = status;
    this.failure = !status;
    this.message = message;
  }
}
