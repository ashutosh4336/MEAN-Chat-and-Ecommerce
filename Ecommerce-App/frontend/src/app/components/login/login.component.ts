import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: HTMLFormElement;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  // Login method
  login(event: Event) {
    event.preventDefault();
    this.form = <HTMLFormElement>event.target;
    this.readFormValues();
  }

  // Naviagating to homePage
  navigateToHomePage() {
    this.router.navigate(['']);
  }

  // getting InputValues from loginFrom
  readFormValues() {
    let email = (<HTMLInputElement>this.form.elements.namedItem('email')).value;
    let password = (<HTMLInputElement>this.form.elements.namedItem('password')).value;

    let credentials = {
      email,
      password,
    };
    // console.log(credentials);

    // After loggedIn, navigate to Home
    this.userService.login(credentials).subscribe(() => this.navigateToHomePage());
  }
}
