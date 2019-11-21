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
    this.onGetAll();
  }

  onGetOverview(form: NgForm) {
    this.WorkTimeRegistrationService.getWorkTimeRegistrationsByDate(form.value['begindate'], form.value['enddate'])
      .subscribe(workTimeRegistrations => {
        this.workTimeRegistrations = workTimeRegistrations;
        this.workTimeRegistrations.sort(this.WorkTimeRegistrationService.orderWorkTimeRegistrationsByDate);
        form.reset()
      });
  }

  onGetAll() {
    this.WorkTimeRegistrationService.getWorkTimeRegistrations()
      .subscribe(workTimeRegistrations => {
        this.workTimeRegistrations = workTimeRegistrations;
        this.workTimeRegistrations.sort(this.WorkTimeRegistrationService.orderWorkTimeRegistrationsByDate);
      });
  }

  onClearOverview() {
    this.workTimeRegistrations = null;
  }

}
