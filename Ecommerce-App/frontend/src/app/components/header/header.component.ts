import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { UserService } from './../../services/user/user.service';
import { CartService } from './../../services/cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  numberOfItems: number = 0;
  isLoggedIn = false;
  isAdminUrl = false;
  isAdmin;
  constructor(
    private cartService: CartService,
    private router: Router,
    private userService: UserService
  ) {
    router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          let url = (<NavigationStart>event).url;
          this.isAdminUrl = url.includes('admin');
        }
      }
    );
  }

  ngOnInit(): void {
    this.cartService.cartObservable.subscribe((cart) => {
        // console.log(cart);
        this.numberOfItems = Object.keys(cart).length;
      }
    );

    this.userService.loginObservable.subscribe(() => {
        let token = this.userService.getToken();
        if (token != '') {
          this.checkAdmin();
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      }
    );
  }

  //check userType ? admin or not
  checkAdmin() {
    this.userService.isAdmin().subscribe((result) => {
      this.isAdmin = result;
    });
  }

  // Logout method
  logout() {
    this.userService.logout();
    this.router.navigate(['login']);
  }
}
