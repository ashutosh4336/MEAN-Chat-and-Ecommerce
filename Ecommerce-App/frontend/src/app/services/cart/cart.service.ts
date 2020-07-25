import { Product } from 'src/app/models/products';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  cart = {};
  private _cartObservable: BehaviorSubject<Object>;
  constructor() {
    if (!this.isCartExists())
      localStorage.setItem('cart', JSON.stringify(this.cart));

    this.readcartDataFromLocalStorage();
    this._cartObservable = new BehaviorSubject(this.cart);
  }

  // Reading cart data from localStorage
  readcartDataFromLocalStorage() {
    this.cart = JSON.parse(localStorage.getItem('cart'));
  }

  // Writing cart data to localStorage
  writeCartDataFromLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  // getter method for subscribing cart data
  get cartObservable() {
    return this._cartObservable;
  }

  // clearing cart
  clearCart() {
    localStorage.removeItem('cart');
    this._cartObservable.next({});
  }

  // adding products to cart
  addToCard(product: Product) {
    let quantity = this.cart[product._id];
    if (quantity) {
      this.cart[product._id] = +quantity + 1;
    } else {
      this.cart[product._id] = 1;
    }
    this._cartObservable.next(this.cart);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  // checking cart in localstorage, if exists
  isCartExists() {
    if (localStorage.getItem('cart')) {
      return true;
    } else {
      return false;
    }
  }

  // getting product quantity
  getQuantity(product: Product) {
    return this.cart[product._id] ? +this.cart[product._id] : 0;
  }

  // setting product quantity
  setQuantity(product: Product, quantity: number) {
    if (quantity < 1) {
      delete this.cart[product._id];
    } else {
      this.cart[product._id] = quantity;
    }
    this.writeCartDataFromLocalStorage();
    this._cartObservable.next(this.cart);
  }
}
