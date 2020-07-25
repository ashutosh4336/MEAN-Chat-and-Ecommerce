import { Component, OnInit, Input } from '@angular/core';
import { CartService } from './../../services/cart/cart.service';
import { Product } from 'src/app/models/products';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;
  quantity: number = 0;
  isAdmin;
  isLoggedIn;

  constructor(private cartService: CartService, private userService: UserService) {}

  ngOnInit(): void {
    // console.log(this.product);
    this.cartService.cartObservable.subscribe(() => {
        this.quantity = this.cartService.getQuantity(this.product);
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
      },
    );
  }

  //check userType ? admin or not
  checkAdmin() {
    this.userService.isAdmin().subscribe((result) => {
      this.isAdmin = result;
    });
  }

  // Adding products to cart
  addToCart() {
    console.log(this.product);
    this.cartService.addToCard(this.product);
  }
}
