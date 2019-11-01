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

  constructor(private userService: UserService, private WorkTimeRegistrationService: WorkTimeRegistrationService) { }

  ngOnInit() {
    //TODO sent id of current logged in user
    this.WorkTimeRegistrationService.getWorkTimeRegistrations(1)
      .subscribe(workTimeRegistrations => {
        this.workTimeRegistrations = workTimeRegistrations;
        console.log(this.workTimeRegistrations)
      });
  }

  onGetOverview(form: NgForm) {

  }

  onClearOverview() {
    this.workTimeRegistrations = [];
  }

}
