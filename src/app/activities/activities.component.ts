import { Component, OnInit } from '@angular/core';
import {ActivityService} from "../service/activity.service";
import {Activity} from "../model/activity";

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  activities: Activity[];
  loading = false;
  error = null;
  connectionError = null;

  constructor(private activityService: ActivityService) { }

  ngOnInit() {
    // this.activityService.getAc()
    //   .subscribe(activities => {
    //     this.departments = departments;
    //   }, errorRes => {
    //     this.connectionError = errorRes;
    //     console.log(this.connectionError)
    //   });
  }

}
