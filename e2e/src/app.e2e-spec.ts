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

    //Browser should reload signin page and clear fields
    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}signin`);

    //Fields should both be emptied automatically after refresh
    expect(element(by.name('username')).getText()).toBe('');
    expect(element(by.name('password')).getText()).toBe('');

    //Browser should show message saying login was not successful
    expect(element(by.id('failure')).isDisplayed()).toBe(true);

    //Message should contain the following text
    expect(element(by.id('failure')).getText()).toBe('Wrong credentials provided, please try again');
  });

  it('Should sign the user in', () => {
    element(by.name('username')).sendKeys('e2e');

    element(by.name('password')).sendKeys('12345678');

    element(by.id('loginform')).submit();

    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}profile`);
  });

  it('should save Jwtrespone with User object and Jwt to localstorage - after user got signed in', () => {
    element(by.name('username')).sendKeys('e2e');

    element(by.name('password')).sendKeys('12345678');

    element(by.id('loginform')).submit();

    browser.wait(element(by.id('canceleditprofile')).isPresent());

    let valLocalStorage = browser.executeScript('return window.localStorage.getItem(\'userData\');');

    expect(valLocalStorage).not.toBeNull();
  });


  afterEach(async () => {
    // save the browser logs
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    console.log(logs);
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
    element(by.name('firstname')).sendKeys('New');

    element(by.name('lastname')).sendKeys('User');

    element(by.name('username')).sendKeys('e2e');

    element(by.name('email')).sendKeys('test@gmail.com');

    element(by.name('password')).sendKeys('qwertyuiop');

    element(by.name('department')).sendKeys('Laboratory');

    element(by.id('signupform')).submit();

    //Browser should reload the signup page
    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}signup`);

    //Browser should show error message saying user could not be created because user with specified username already exists
    expect(element(by.id('registrationFailure')).isDisplayed()).toBe(true);
    expect(element(by.id('registrationFailure')).getText()).toBe('User with specified Username already exists, please create a different Username');
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
    expect(departments.get(3).getText()).toBe(' General ');
  });

  it('should sign up the new user', () => {
    element(by.name('firstname')).sendKeys('New');

    element(by.name('lastname')).sendKeys('User');

    element(by.name('username')).sendKeys('newUser');

    element(by.name('email')).sendKeys('newuser@gmail.com');

    element(by.name('password')).sendKeys('qwertyuiop');

    element(by.name('department')).sendKeys('Laboratory');

    element(by.id('signupform')).submit();

    //Browser should redirect to signin page with url containing registered=true
    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}signin?registered=true`);

    //Registration success message should be shown
    expect(element(by.id('success')).isDisplayed()).toBe(true);

    //Message should say 'Registration successful'
    expect(element(by.id('success')).getText()).toBe('Registration successful');
  });

  afterEach(async () => {
    // save the browser logs
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    console.log(logs);
    // expect(logs).not.toContain(jasmine.objectContaining({
    //   level: logging.Level.SEVERE,
    // } as logging.Entry));
  });
});

describe('Switch page login/register', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo('');
  });

  it('should change page from signin to signup', () => {
    element(by.id('switchToSignup')).click();

    //Browser should direct to signup page
    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}signup`);
  });

  it('should change page from signup to signin', () => {
    page.navigateTo('signup');

    //Click swith button
    element(by.id('switchToSignin')).click();

    //Browser should direct to signup page
    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}signin`);
  });

  afterEach(async () => {
    // save the browser logs
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    console.log(logs);
    // expect(logs).not.toContain(jasmine.objectContaining({
    //   level: logging.Level.SEVERE,
    // } as logging.Entry));
  });
});

describe('Header', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo('');

    //Login
    element(by.name('username')).sendKeys('e2e');
    element(by.name('password')).sendKeys('12345678');
    element(by.id('loginform')).submit();

    //Wait until the async login function has been completed
    browser.wait(element(by.id('canceleditprofile')).isPresent());
  });

  it('should take te user to the home page (profile page) by clicking on the logo', () => {
    //Change to other page because after login user wil automatically be directed to the home/profile page
    page.navigateTo('clocking');

    //Find and click the logo button in the top left corner of the header
    element.all(by.tagName('app-root')).all(by.tagName('app-header')).all(by.id('profilelink')).click();

    //Browser should've directed the user to the home/profile page
    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}profile`);
  });

  it('should take the user to the overview page', () => {
    //Find and click the 'overview' button in the header
    element.all(by.tagName('app-root')).all(by.tagName('app-header')).all(by.id('overviewlink')).click();

    //Browser should've directed the user to the overview page
    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}overview`);
  });

  it('should take the user to the clocking page', () => {
    //Find and click the 'clocking' button in the heacder
    element.all(by.tagName('app-root')).all(by.tagName('app-header')).all(by.id('clockinglink')).click();

    //Browser should've directed the user to the clocking page
    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}clocking`);
  });

  it('should take te user to the home page (profile page) by clicking on the edit button in the profile dropdown', () => {
    //Change to other page because after login user wil automatically be directed to the home/profile page
    page.navigateTo('clocking');

    //Click the 'Profile' button in the top right corner of the header to expand the dropdown
    element.all(by.tagName('app-root')).all(by.tagName('app-header')).all(by.id('profile-dropdown')).click();

    //Click on the 'Edit' option in the dropdown
    element.all(by.tagName('app-root')).all(by.tagName('app-header')).all(by.id('edit-profile')).click();

    //Browser should've directed the user to the profile page
    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}profile`);
  });

  it('should log the user out', () => {
    //Click the 'Profile' button in the top right corner of the header to expand the dropdown
    element.all(by.tagName('app-root')).all(by.tagName('app-header')).all(by.id('profile-dropdown')).click();

    //Click on the 'Logout' option in the dropdown
    element.all(by.tagName('app-root')).all(by.tagName('app-header')).all(by.id('logout')).click();

    //Wait for the logout process to be completed and the signin page to be loaded
    browser.wait(element(by.id('signin-btn')).isPresent());

    //Save the value of the localstorage item with 'userData' as key
    let valLocalStorage = browser.executeScript('return window.localStorage.getItem(\'userData\');');

    //Browser should've directed the user to the signin page
    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}signin`);

    //localstorage should be emptied after logout (userData containing the user object and bearer token should be deleted)
    expect(valLocalStorage).toBeNull();
  });

  afterEach(async () => {
    // save the browser logs
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    //console.log(logs);
    // expect(logs).not.toContain(jasmine.objectContaining({
    //   level: logging.Level.SEVERE,
    // } as logging.Entry));
  });
});

describe('Profile', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo('');
  });

  it('should save the edited user profile', () => {
    //Login
    element(by.name('username')).sendKeys('editProfileTest');
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
    expect(element(by.id('success')).getText()).toBe('Profile updated re-login required');
  });

  it('should direct the user to clocking page', () => {
    //Login
    element(by.name('username')).sendKeys('e2e');
    element(by.name('password')).sendKeys('12345678');
    element(by.id('loginform')).submit();

    element(by.id('canceleditprofile')).click();

    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}clocking`);
  });

  afterEach(async () => {
    // save the browser logs
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    console.log(logs);
    // expect(logs).not.toContain(jasmine.objectContaining({
    //   level: logging.Level.SEVERE,
    // } as logging.Entry));
  });
});

describe('Overview', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo('');

    //Login
    element(by.name('username')).sendKeys('e2e');
    element(by.name('password')).sendKeys('12345678');
    element(by.id('loginform')).submit();

    //Wait until the async login function has been completed
    browser.wait(element(by.id('canceleditprofile')).isPresent());

    //Navigate to the overview page
    page.navigateTo('overview');

    browser.wait(element(by.id('clearoverview')).isPresent());
  });

  it('should clear the overview', () => {

    //Click the clear overview button
    element(by.id('clearoverview')).click();

    //Get the amount of worktime registrations from the table
    let worktimeRegistrations = element.all(by.id('worktimeregistrationstable')).all(by.id('tablecontent'));

    //Table containing the worktime registrations should be empty
    expect(worktimeRegistrations.count()).toBe(0);

    //Browser should show message saying the table is empty
    expect(element(by.id('tableempty')).isDisplayed()).toBe(true);
    expect(element(by.id('tableempty')).getText()).toBe('Overview is empty, please specify dates and click on the `Fetch Overview` button or click the `Fetch all` button');
  });

  it('should fetch the complete overview', () => {
    //First clear the overview, as it is automatically fetched at page load
    element(by.id('clearoverview')).click();

    //Fetch overview
    element(by.id('fetchall')).click();

    //Get the amount of worktime registrations from the table
    let worktimeRegistrations = element.all(by.id('worktimeregistrationstable')).all(by.id('tablecontent'));

    //Table containing the worktime registrations should be greather than 0
    expect(worktimeRegistrations.count()).toBeGreaterThan(0);
  });

  it('should fetch the overview by date specification', () => {
    //Enter startdate
    element(by.id('startdate')).sendKeys('01092019');

    //Enter enddate
    element(by.id('enddate')).sendKeys('30092019');

    element(by.id('fetch-overview-by-date-form')).submit();

    // browser.wait(element(by.id('fetch-overview-by-date')).isPresent());
    //
    let worktimeRegistrations = element.all(by.id('worktimeregistrationstable')).all(by.id('tablecontent')).all(by.id('tablerow'));
    //
    // let first = worktimeRegistrationsDates.get(2);
    //

    // first.getText().then((value) => {
    //   let firstDate = new Date(value);
    //   console.log(firstDate);
    //   //expect(firstDate.getDate()).toBeGreaterThan(1092019);
    // });

    //Amount of worktime registrations should be greater than 0
    expect(worktimeRegistrations.count()).toBeGreaterThan(0);
  });

  it('should have disabled the Fetch Overview button because the dates are invalid (value of startdate is after the value of enddate)', () => {
    //Enter startdate
    element(by.id('startdate')).sendKeys('01092019');

    //Enter enddate
    element(by.id('enddate')).sendKeys('01082019');

    expect(element(by.id('fetch-overview-by-date')).isEnabled()).toBe(false);
  });

  afterEach(async () => {
    // save the browser logs
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    console.log(logs);
    // expect(logs).not.toContain(jasmine.objectContaining({
    //   level: logging.Level.SEVERE,
    // } as logging.Entry));
  });
});

describe('Clocking', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo('');

    //Login
    element(by.name('username')).sendKeys('e2e');
    element(by.name('password')).sendKeys('12345678');
    element(by.id('loginform')).submit();

    //Wait until the async login function has been completed
    browser.wait(element(by.id('canceleditprofile')).isPresent());

    //Navigate to the overview page
    page.navigateTo('clocking');
  });

  it('should fetch all the worktime registrations as seperate blocks', () => {
    //Get the amount of worktime registrations from the page
    let worktimeRegistrations = element.all(by.id('worktime-registration-entries')).all(by.tagName('app-worktime-registration'));

    //The amount of worktime registrations should be greater than 0
    expect(worktimeRegistrations.count()).toBeGreaterThan(0);
  });

  it('should have disabled the add button when the starttime and endtime are invalid (Starttime is after the endtime)', () => {
    //Set activity
    element(by.id('activity')).sendKeys('Administration');
    //Set woring day date
    element(by.id('workingdaydate')).sendKeys('10012020');
    //Set starttime
    element(by.id('starttime')).sendKeys('1600');
    //Set endtime
    element(by.id('endtime')).sendKeys('1100');

    expect(element(by.id('add-worktime-registration')).isEnabled()).toBe(false);
  });

  it('should add a new worktime registration', () => {
    //Set activity
    element(by.id('activity')).sendKeys('Administration');
    //Set woring day date
    element(by.id('workingdaydate')).sendKeys('10012020');
    //Set starttime
    element(by.id('starttime')).sendKeys('0800');
    //Set endtime
    element(by.id('endtime')).sendKeys('1800');

    element(by.id('create-worktime-registration-form')).submit();

    //Browser should display message on clocking page after successfully adding a new worktime registration entry
    expect(element(by.tagName('app-alert')).isDisplayed()).toBe(true);
    expect(element(by.tagName('app-alert')).getText()).toBe('Add succesful');

    //Add button shoud be disabled after adding new worktime registration
    expect(element(by.id('add-worktime-registration')).isEnabled()).toBe(false);

    //Fields for adding worktime registration should be emptied
    expect(element(by.id('workingdaydate')).getAttribute('value')).toBe('');
    expect(element(by.id('starttime')).getAttribute('value')).toBe('');
    expect(element(by.id('endtime')).getAttribute('value')).toBe('')
  });

  it('should clear the fields for adding a new worktime registration', () => {
    //Set activity
    element(by.id('activity')).sendKeys('Administration');
    //Set woring day date
    element(by.id('workingdaydate')).sendKeys('11012020');
    //Set starttime
    element(by.id('starttime')).sendKeys('1300');
    //Set endtime
    element(by.id('endtime')).sendKeys('1900');

    //Fields should have the filled in values
    expect(element(by.id('activity')).getText()).toBe(' Administration ');
    expect(element(by.id('workingdaydate')).getAttribute('value')).toBe('2020-01-11');
    expect(element(by.id('starttime')).getAttribute('value')).toBe('13:00');
    expect(element(by.id('endtime')).getAttribute('value')).toBe('19:00');

    //Click clear button to clear fields
    element(by.id('clear-fields')).click();

    //Fields should be empty
    expect(element(by.id('workingdaydate')).getAttribute('value')).toBe('');
    expect(element(by.id('starttime')).getAttribute('value')).toBe('');
    expect(element(by.id('endtime')).getAttribute('value')).toBe('');
  });

  it('should update the selected worktime registration', () => {
    //Change fields of worktime registration
    element(by.tagName('app-worktime-registration')).element(by.id('starttime')).sendKeys('0700');
    element(by.tagName('app-worktime-registration')).element(by.id('endtime')).sendKeys('1900');
    element(by.tagName('app-worktime-registration')).element(by.id('workingdaydate')).sendKeys('11012020');

    //Click save button
    element(by.tagName('app-worktime-registration')).element(by.id('update-worktime-registration-form')).submit();

    //Browser should show alert saying 'Update succesfull'
    expect(element(by.tagName('app-alert')).isDisplayed()).toBe(true);
    expect(element(by.tagName('app-alert')).getText()).toBe('Update successful');

    //Update button should be disabled after updating
    expect(element(by.id('update-worktime-registration')).isEnabled()).toBe(false);
  });

  it('should delete the selected worktime registration', () => {
    //Click delete button
    element(by.id('delete-worktime-registration')).click();

    //Browser should show message saying 'Delete Successful'
    expect(element(by.tagName('app-alert')).isDisplayed()).toBe(true);
    expect(element(by.tagName('app-alert')).getText()).toBe('Delete successful');
  });
});
