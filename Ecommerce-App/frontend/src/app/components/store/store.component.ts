import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../services/product/product.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  products: any;
  constructor(
    private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (products) => {
        // console.log(products);
        this.products = products;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
