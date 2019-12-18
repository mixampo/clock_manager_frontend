import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  messageSubject = new Subject<string>();
  successSubject = new Subject<boolean>();
  failureSubject = new Subject<boolean>();

  constructor() { }
}
