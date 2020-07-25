import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  OrderInfo,
  ProductInfo,
  OrderService,
} from './../../services/order/order.service';
import { map } from 'rxjs/operators';
import { ProductService } from './../../services/product/product.service';
import { Product } from 'src/app/models/products';
import { CartService } from './../../services/cart/cart.service';
import { forkJoin, Subscription } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

interface CartItem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart;
  total = 0;
  cartItems: CartItem[] = [];
  cartSubscription: Subscription;
  modalRef: BsModalRef;
  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router,
    private orderService: OrderService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.subcribeCart();
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  // Getting Cart data i.e itemsInCart, Total, productDetails
  subcribeCart() {
    let total = 0;
    this.cartSubscription = this.cartService.cartObservable.subscribe((cart) => {
      // All observables are pushed to observable array and then executed by forkJoin
        let observable = [];
        total = 0;
        if (Object.keys(cart).length == 0) {
          this.cartItems = [];
        }
        for (let id in cart) {
          // console.log(id);
          observable.push(
            // Getting each product which is in cart by its ID
            this.productService.getProductsById(id).pipe(
              map((product: Product) => {
                total += product.price * cart[id];
                let item: CartItem = {
                  product: product,
                  quantity: cart[id],
                };
                return item;
              })
            )
          );
        }

        // forkJoin taking a list of Observables and executing them in parallel
        forkJoin(observable).subscribe((cartItems: CartItem[]) => {
            this.total = total;
            this.cartItems = cartItems;
          }
        );
      },
    );
  }
  //open model
  openModel(form) {
    this.modalRef = this.modalService.show(form, {
      animated: true,
      class: 'modal-lg',
    });
  }

  //check out cart
  checkOut(event: Event, form: HTMLFormElement) {
    event.preventDefault();
    let firstName = (<HTMLInputElement>form.elements.namedItem('firstName'))
      .value;
    let lastName = (<HTMLInputElement>form.elements.namedItem('lastName'))
      .value;
    let address = (<HTMLInputElement>form.elements.namedItem('address')).value;

    let orderInfo: OrderInfo;
    let productInfos: ProductInfo[] = [];
    this.cartItems.forEach((el) => {
      productInfos.push({
        price: el.product.price,
        productId: el.product._id,
        quantity: el.quantity,
      });
    });

    orderInfo = {
      address,
      firstName,
      lastName,
      products: productInfos,
    };
    console.log({
      orderInfo,
    });

    this.orderService.placeOrder(orderInfo).subscribe(() => {
        this.modalRef.hide();
        this.cartService.clearCart();
        this.router.navigate(['orders']);
      },
      (err) => {
        console.log({ err: 'cant place order...' });
      }
    );
    return false;
  }
}
