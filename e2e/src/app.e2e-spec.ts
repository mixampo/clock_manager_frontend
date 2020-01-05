import {AppPage} from './app.po';
import {browser, by, element, logging} from 'protractor';


describe('signin', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo('');
  });

  it('Should not sign the user in', () => {
    element(by.name('username')).sendKeys('NoUser');

    element(by.name('password')).sendKeys('NoUserPassword');

    element(by.id('loginform')).submit();

    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}signin`);
  });

  it('Should sign the user in', () => {
    element(by.name('username')).sendKeys('test');

    element(by.name('password')).sendKeys('12345678');

    element(by.id('loginform')).submit();

    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}profile`);
  });

  it('should save Jwtrespone with User object and Jwt to localstorage - after user got signed in', () => {
    element(by.name('username')).sendKeys('test');

    element(by.name('password')).sendKeys('12345678');

    element(by.id('loginform')).submit();

    let valLocalStorage = browser.executeScript('return window.localStorage.getItem(\'userData\');');

    !expect(valLocalStorage).toBeNull();
  });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    // expect(logs).not.toContain(jasmine.objectContaining({
    //   level: logging.Level.SEVERE,
    // } as logging.Entry));
  });
});

describe('signup', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo('signup');
  });

  it('should not sign the user up - username already exists', () => {

  });

  it('should have invalid fields', () => {

  });

  it('should have all the available departments listed', () => {
    let departments = element.all(by.id('department')).all(by.name('department-list'));

    expect(departments.count()).toBe(4);

    expect(departments.get(0).getText()).toBe(' Office ');
    expect(departments.get(1).getText()).toBe(' Laboratory ');
    expect(departments.get(2).getText()).toBe(' Packaging & Sending ');
    expect(departments.get(3).getText()).toBe(' General ')
  });

  it('should sign up the new user', () => {
    element(by.name('firstname')).sendKeys('John');

    element(by.name('lastname')).sendKeys('Doe');

    element(by.name('username')).sendKeys('newUser');

    element(by.name('email')).sendKeys('johndoe@gmail.com');

    element(by.name('password')).sendKeys('qwertyuiop');

    element(by.name('department')).sendKeys('Laboratory');

    element(by.id('signupform')).submit();

    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}signin?registered=true`);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
