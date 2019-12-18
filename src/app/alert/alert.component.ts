import {Component, Input, OnInit} from '@angular/core';
import {AlertService} from '../service/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() message: string;
  @Input() success: boolean = false;
  @Input() failure: boolean = false;

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
    this.alertService.successSubject.subscribe(isSuccess => {
      this.success = isSuccess;
    });
    this.alertService.failureSubject.subscribe(isFailure => {
      this.failure = isFailure;
    });
    this.alertService.messageSubject.subscribe(message => {
      this.message = message;
    });
  }
}
