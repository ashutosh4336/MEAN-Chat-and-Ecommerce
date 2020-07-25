import { UserService } from './../services/user/user.service';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeaderInterceptorService implements HttpInterceptor {
  constructor(private userService: UserService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let header = req.headers.set('authorization', this.userService.getToken());
    let request = req.clone({
      headers: header,
    });
    // console.log(request);
    return next.handle(request);
  }
}
