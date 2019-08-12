import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  userLoggedIn: boolean;
  constructor(private loginSerive: LoginService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.loginSerive.isUserLoggedIn) {
      this.userLoggedIn = true;
    } else {
      this.router.onSameUrlNavigation = 'reload';
      this.userLoggedIn = false;
    }
    return this.userLoggedIn;
  }
}
