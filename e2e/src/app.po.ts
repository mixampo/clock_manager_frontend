import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(path: string) {
    if (path === '') {
      return browser.get(browser.baseUrl) as Promise<any>;
    } else {
      return browser.get(browser.baseUrl + path) as Promise<any>;
    }
  }
}
