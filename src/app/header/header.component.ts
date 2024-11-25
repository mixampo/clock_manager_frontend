import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {Subscription} from "rxjs";
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private authService: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.authService.signOutUser();
    this.router.navigate(['/signin']);
  }

  onEditProfile() {
    this.router.navigate(['/profile']);
  }

  onManageDepartments() {
    this.router.navigate(['/departments'])
  }

  onManageActivities() {
    this.router.navigate(['/activities'])
  }
}
