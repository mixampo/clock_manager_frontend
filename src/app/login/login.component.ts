import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AlertService} from '../service/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userRegistrationSuccess: boolean = false;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.userRegistrationSuccess = this.alertService.getRegistrationSuccess();
  }

  onSignIn(form: NgForm) {

  }
}
