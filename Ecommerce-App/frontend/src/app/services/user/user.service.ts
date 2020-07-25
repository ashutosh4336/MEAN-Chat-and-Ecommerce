import { User } from './../../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  userCreateUrl = 'http://127.0.0.1:5000/api/users/create';
  userLoginUrl = 'http://127.0.0.1:5000/api/users/login';
  isAdminUrl = 'http://127.0.0.1:5000/api/users/is-admin';
  _loginObservable: BehaviorSubject<Object>;

  constructor(private http: HttpClient) {
    this._loginObservable = new BehaviorSubject({});
  }

  // Getter method used to subscribe data during login and logout
  public get loginObservable() {
    return this._loginObservable;
  }

  // saving token to localstorage
  private saveTokenToLocalStorage(token: string) {
    localStorage.setItem('token', 'Bearer ' + token);
  }

  // Logout method
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    this._loginObservable.next({});
  }

  // Getting token from localsorage
  getToken() {
    return localStorage.getItem('token') ? localStorage.getItem('token') : '';
  }

  // Checking user session
  isLoggedIn() {
    if (this.getToken() != '') {
      return true;
    }
    return false;
  }

  // Checking userType ? User : Admin
  isAdmin() {
    return this.http.get(this.isAdminUrl);
  }

  // Adding User
  addUser(user: User) {
    return this.http.post(this.userCreateUrl, user);
  }

  // Login method
  login(credentials: { email: string; password: string }) {
    return this.http.post(this.userLoginUrl, credentials).pipe(
      map((result: loginResponse) => {
        this.saveTokenToLocalStorage(result.token);
        this._loginObservable.next({});
        return result;
      })
    );
  }
}

interface loginResponse {
  message: string;
  token: string;
}
