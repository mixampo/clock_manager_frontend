import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import {DropdownDirective} from './shared/dropdown.directive';
import { OverviewComponent } from './overview/overview.component';
import { ClockingComponent } from './clocking/clocking.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {FormsModule} from '@angular/forms';
import {UserService} from './service/user.service';
import {DepartmentService} from './service/department.service';
import {WorkTimeRegistrationService} from "./service/work-time-registration.service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AlertService} from './service/alert.service';
import {AuthService} from './service/auth.service';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import {AuthGuard} from './auth/auth.guard';
import {AnonymousAuthGuard} from "./auth/anonymous.auth.guard";
import {ActivityService} from './service/activity.service';
import { WorktimeRegistrationComponent } from './worktime-registration/worktime-registration.component';
import { AlertComponent } from './alert/alert.component';
import { ActivitiesComponent } from './activities/activities.component';
import { DepartmentsComponent } from './departments/departments.component';
import { ActivityComponent } from './activity/activity.component';
import {AdminAuthGuard} from './auth/admin.auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    DropdownDirective,
    OverviewComponent,
    ClockingComponent,
    LoginComponent,
    SignupComponent,
    LoadingSpinnerComponent,
    WorktimeRegistrationComponent,
    AlertComponent,
    ActivitiesComponent,
    DepartmentsComponent,
    ActivityComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [UserService,
    DepartmentService,
    WorkTimeRegistrationService,
    ActivityService,
    AlertService,
    AuthService,
    AuthGuard,
    AnonymousAuthGuard,
    AdminAuthGuard
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptorService,
    //   multi: true
    // }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
