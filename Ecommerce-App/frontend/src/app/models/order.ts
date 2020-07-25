import { User } from './user';
import { Product } from './products';

export interface Order {
    _id: string;
    quantity: number;
    product: Product;
    price: number;
    user: User;
    firstName: string;
    lastName: string;
    address: string;
    createdAt: string;
    __v: number;
  }
