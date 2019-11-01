import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AlertService} from '../service/alert.service';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userRegistrationSuccess: boolean = false;
  error = null;

  constructor(private alertService: AlertService, private authService: AuthService) { }

  ngOnInit() {
    this.userRegistrationSuccess = this.alertService.getRegistrationSuccess();
  }

  onSignIn(form: NgForm) {
    console.log(form.value);
    this.authService.signInUser(form.value)
      .subscribe(resData => {
        console.log(resData);
      }, error => {
        this.error = error;
        console.log(error);
        form.reset()
      });
  }
}
