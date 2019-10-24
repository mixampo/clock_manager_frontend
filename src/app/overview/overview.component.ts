import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onGetOverview() {
    this.userService.getAllUsers();
  }

}
