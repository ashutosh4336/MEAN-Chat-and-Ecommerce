import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../../../services/user/user.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  isLoggedIn;
  constructor(private userService : UserService, private router : Router) { }

  ngOnInit(): void {
    this.userService.loginObservable.subscribe(() => {
        let token = this.userService.getToken();
        if (token != '') {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      }
    );
  }

  // Logout method
  logout(){
    this.userService.logout();
    this.router.navigate(['login'])
  }

}
