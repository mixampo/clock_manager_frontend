import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

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
import {AlertService} from './service/alert.service';
import {WorkTimeRegistrationService} from "./service/work-time-registration.service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [UserService, DepartmentService, AlertService, WorkTimeRegistrationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
