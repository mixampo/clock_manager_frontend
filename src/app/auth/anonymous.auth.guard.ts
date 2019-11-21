import {CanActivate, Router, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {UserService} from "../service/user.service";

@Injectable({
  providedIn: 'root'
})
export class AnonymousAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
  }

  canActivate(): boolean | UrlTree {
    if (!this.userService.getCurrentUser()) {
      return  true;
    }
    return this.router.parseUrl('profile');
  }
}
