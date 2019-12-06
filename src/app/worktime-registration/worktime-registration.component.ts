import {Component, Input, OnInit} from '@angular/core';
import {WorkTimeRegistration} from '../model/workTimeRegistration';
import {Activity} from '../model/activity';
import {ActivityService} from '../service/activity.service';

@Component({
  selector: 'app-worktime-registration',
  templateUrl: './worktime-registration.component.html',
  styleUrls: ['./worktime-registration.component.css']
})
export class WorktimeRegistrationComponent implements OnInit {
  @Input()  worktimeRegistration: WorkTimeRegistration;
  activities: Activity[];
  defaultActivity: Activity;

  constructor(private activityService: ActivityService) { }

  ngOnInit() {
    this.activityService.getActivitiesByDepartmentId()
      .subscribe(activities => {
        this.activities = activities;
        this.defaultActivity = this.activities.find(x => x.name === this.worktimeRegistration.activity.name)
      });
  }

}
