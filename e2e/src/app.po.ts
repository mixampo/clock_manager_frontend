import { browser } from 'protractor';
import {Activity} from "../../src/app/model/activity";
import {Department} from "../../src/app/model/department";
import {Time} from "@angular/common";

export class AppPage {
  navigateTo(path: string) {
    if (path === '') {
      return browser.get(browser.baseUrl) as Promise<any>;
    } else {
      return browser.get(browser.baseUrl + path) as Promise<any>;
    }
  }
}
