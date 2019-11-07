import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {NgForm} from '@angular/forms';
import {WorkTimeRegistrationService} from '../service/work-time-registration.service';
import {WorkTimeRegistration} from '../model/workTimeRegistration';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  workTimeRegistrations: WorkTimeRegistration[];

  constructor(private userService: UserService, private WorkTimeRegistrationService: WorkTimeRegistrationService, private authService: AuthService) {
  }

  ngOnInit() {
    this.WorkTimeRegistrationService.getWorkTimeRegistrations()
      .subscribe(workTimeRegistrations => {
        this.workTimeRegistrations = workTimeRegistrations;
      });
  }

  onGetOverview(form: NgForm) {
    this.WorkTimeRegistrationService.getWorkTimeRegistrationsByDate(form.value['begindate'], form.value['enddate'])
      .subscribe(workTimeRegistrations => {
        this.workTimeRegistrations = workTimeRegistrations;
      });
  }

  onGetAll() {
    this.WorkTimeRegistrationService.getWorkTimeRegistrations()
      .subscribe(workTimeRegistrations => {
        this.workTimeRegistrations = workTimeRegistrations;
      });
  }

  onClearOverview() {
    this.workTimeRegistrations = [];
  }

}
