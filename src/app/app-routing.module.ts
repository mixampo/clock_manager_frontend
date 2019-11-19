import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {OverviewComponent} from './overview/overview.component';
import {ClockingComponent} from './clocking/clocking.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {AuthGuard} from './auth/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'overview', component: OverviewComponent, canActivate: [AuthGuard] },
  { path: 'clocking', component: ClockingComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
