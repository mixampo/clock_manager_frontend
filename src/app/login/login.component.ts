import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AlertService} from '../service/alert.service';
import {AuthService} from '../service/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userRegistrationSuccess: boolean = false;
  error = null;
  loading = false;

  constructor(private alertService: AlertService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.userRegistrationSuccess = this.alertService.getRegistrationSuccess();
  }

  onSignIn(form: NgForm) {
    this.alertService.setRegistrationSuccess(false);
    this.userRegistrationSuccess = this.alertService.getRegistrationSuccess();
    this.loading = true;
    this.error = null;

    this.authService.signInUser(form.value)
      .subscribe(resData => {
        console.log(resData);
        this.router.navigate(['/home']);
        this.loading = false
      }, error => {
        this.error = error;
        this.loading = false;
        console.log(error);
        form.reset()
      });
  }
}
