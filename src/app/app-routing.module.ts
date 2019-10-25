import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {OverviewComponent} from './overview/overview.component';
import {ClockingComponent} from './clocking/clocking.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';


const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'overview', component: OverviewComponent },
  { path: 'clocking', component: ClockingComponent },

  /* If page not found redirect to sign in page */
  //{ path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
