import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {NgForm} from "@angular/forms";
import {WorkTimeRegistrationService} from "../service/work-time-registration.service";
import {WorkTimeRegistration} from "../model/workTimeRegistration";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  workTimeRegistrations: WorkTimeRegistration[];

  constructor(private userService: UserService, private WorkTimeRegistration: WorkTimeRegistrationService) { }

  ngOnInit() {
  }

  onGetOverview(form: NgForm) {

  }

}
