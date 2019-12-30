import { AppPage } from './app.po';
import {browser, by, element, logging} from 'protractor';



describe('signin', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should sign the user in', () => {
    page.navigateTo('');

    element(by.name('username')).sendKeys('test');
    browser.pause();

    element(by.name('password')).sendKeys('12345678');
    browser.pause();

    element(by.id('loginform')).submit();

    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}profile`)
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

describe('signup', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should sign up the new user', () => {
    page.navigateTo('signup');

    element(by.name('firstname')).sendKeys('John');
    browser.pause();

    element(by.name('lastname')).sendKeys('Doe');
    browser.pause();

    element(by.name('username')).sendKeys('newUser');
    browser.pause();

    element(by.name('email')).sendKeys('johndoe@gmail.com');
    browser.pause();

    //TODO select department

    element(by.name('password')).sendKeys('qwertyuiop');
    browser.pause();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
