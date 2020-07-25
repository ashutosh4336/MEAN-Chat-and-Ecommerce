import { UserService } from './../services/user/user.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserAuthGuardService implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let flag = false;
    //  console.log('user Auth guard Check');

    if (this.userService.isLoggedIn()) {
      console.log('User authenticated');
      flag = true;
    } else {
      console.log('User not authenticated');
      this.router.navigate(['login']);
    }
    return flag;
  }
}
