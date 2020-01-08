import {AppPage, User} from './app.po';
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

    //Browser should reload signin page and clear fields
    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}signin`);

    //Fields should both be emptied automatically after refresh
    expect(element(by.name('username')).getText()).toBe('');
    expect(element(by.name('password')).getText()).toBe('');

    //Browser should show message saying login was not successful
    expect(element(by.id('failure')).isDisplayed()).toBe(true);

    //Message should contain the following text
    expect(element(by.id('failure')).getText()).toBe('Wrong credentials provided, please try again')
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
    console.log(logs)
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
    element(by.name('firstname')).sendKeys('John');

    element(by.name('lastname')).sendKeys('Doe');

    element(by.name('username')).sendKeys('test');

    element(by.name('email')).sendKeys('test@gmail.com');

    element(by.name('password')).sendKeys('qwertyuiop');

    element(by.name('department')).sendKeys('Laboratory');

    element(by.id('signupform')).submit();

    //Browser should reload the signup page
    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}signup`);

    //Browser should show error message saying user could not be created because user with specified username already exists
    expect(element(by.id('registrationFailure')).isDisplayed()).toBe(true);
    expect(element(by.id('registrationFailure')).getText()).toBe('User with specified Username already exists, please create a different Username')
  });

  it('should have invalid fields', () => {
    element(by.name('email')).sendKeys('johndoe.gmail.com');
    element(by.name('password')).sendKeys('1234567');
    element(by.name('department')).sendKeys('Laboratory');

    //email and password field should both be invalid and message should be shown
    expect(element(by.id('invalidEmail')).isDisplayed()).toBe(true);
    expect(element(by.id('invalidEmail')).getText()).toBe('Please enter a valid e-mail address');

    expect(element(by.id('invalidPassword')).isDisplayed()).toBe(true);
    expect(element(by.id('invalidPassword')).getText()).toBe('Password must be at least 8 characters');

    //Button to register should be disabled
    expect(element(by.id('registerButton')).isEnabled()).toBe(false);
  });

  it('should have all the available departments listed', () => {
    let departments = element.all(by.id('department')).all(by.name('department-list'));

    expect(departments.count()).toBe(4);

    //All available departments should have the following name and should each be on the right place
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

    //Browser should redirect to signin page with url containing registered=true
    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}signin?registered=true`);

    //Registration success message should be shown
    expect(element(by.id('success')).isDisplayed()).toBe(true);

    //Message should say 'Registration successful'
    expect(element(by.id('success')).getText()).toBe('Registration successful')
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    console.log(logs)
    // expect(logs).not.toContain(jasmine.objectContaining({
    //   level: logging.Level.SEVERE,
    // } as logging.Entry));
  });
});

describe('Switch page login/register', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo('signin');
  });

  it('should change page from signin to signup', () => {
    element(by.id('switchToSignup')).click();

    //Browser should direct to signup page
    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}signup`);
  });

  it('should change page from signup to signin', () => {
    page.navigateTo('signup');

    element(by.id('switchToSignin')).click();

    //Browser should direct to signup page
    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}signin`);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    console.log(logs)
    // expect(logs).not.toContain(jasmine.objectContaining({
    //   level: logging.Level.SEVERE,
    // } as logging.Entry));
  });
});

//TODO Fix how to access header elements
describe('Header', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo('signin');

    //Login
    element(by.name('username')).sendKeys('test');
    element(by.name('password')).sendKeys('12345678');
    element(by.id('loginform')).submit();
  });

  it('should take te user to the home page (profile page)', () => {
    page.navigateTo('clocking');

    element(by.id('profilelink')).click();

    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}profile`)
  });

  it('should take the user to the overview page', () => {

  });

  it('should take the user to the clocking page', () => {

  });

  it('should log the user out', () => {

  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    console.log(logs)
    // expect(logs).not.toContain(jasmine.objectContaining({
    //   level: logging.Level.SEVERE,
    // } as logging.Entry));
  });
});

describe('Profile', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo('signin');
  });

  it('should save the edited user profile', () => {
    //Login
    element(by.name('username')).sendKeys('banaan');
    element(by.name('password')).sendKeys('12345678');
    element(by.id('loginform')).submit();

    //Clear fields
    element(by.name('firstname')).clear();
    element(by.name('lastname')).clear();
    element(by.name('email')).clear();
    element(by.name('username')).clear();
    element(by.name('password')).clear();

    //Edit profile fields
    element(by.name('firstname')).sendKeys('Jan');
    element(by.name('lastname')).sendKeys('Dobbelsteen');
    element(by.name('department')).sendKeys('Laboratory');
    element(by.name('email')).sendKeys('jandobbelsteen@gmail.com');
    element(by.name('username')).sendKeys('appel');
    element(by.name('password')).sendKeys('qwertyuiop');

    element(by.id('editprofileform')).submit();

    //Browser should redirect user to signin page after saving profile changes
    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}signin?updated=true`);

    //Browser should log out user, so localstorage should not contain userData anymore
    let valLocalStorage = browser.executeScript('return window.localStorage.getItem(\'userData\');');

    expect(valLocalStorage).toBeNull();

    //Browser should show message saying 'Profile updated re-login required'
    expect(element(by.id('success')).isDisplayed()).toBe(true);
    expect(element(by.id('success')).getText()).toBe('Profile updated re-login required')
  });

  it('should direct the user to clocking page', () => {
    //Login
    element(by.name('username')).sendKeys('banaan');
    element(by.name('password')).sendKeys('12345678');
    element(by.id('loginform')).submit();

    element(by.id('canceleditprofile')).click();

    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}clocking`);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    console.log(logs)
    // expect(logs).not.toContain(jasmine.objectContaining({
    //   level: logging.Level.SEVERE,
    // } as logging.Entry));
  });
});

describe('Overview', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo('signin');

    //Login
    element(by.name('username')).sendKeys('test');
    element(by.name('password')).sendKeys('12345678');
    element(by.id('loginform')).submit();
  });

  it('should clear the overview', () => {

  });

  it('should fetch the complete overview', () => {

  });

  it('should fetch the overview by date specification', () => {

  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    console.log(logs)
    // expect(logs).not.toContain(jasmine.objectContaining({
    //   level: logging.Level.SEVERE,
    // } as logging.Entry));
  });
});
