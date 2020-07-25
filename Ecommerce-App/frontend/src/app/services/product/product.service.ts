import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getAllProductUrl = 'http://127.0.0.1:5000/api/products';

  constructor(private http: HttpClient) {}

  // get All Products
  getAllProducts() {
    return this.http.get(`${this.getAllProductUrl}`);
  }

  // get Products By Id
  getProductsById(id: string) {
    return this.http.get(`${this.getAllProductUrl}/${id}`);
  }

  //saving Product
  saveProduct(data: any) {
    return this.http.post(this.getAllProductUrl, data);
  }
}
