import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ProductModel} from '../models/product.model';
import {OrdersService} from '../services/orders.service';

@Injectable({
  providedIn: 'any'
})
export class CartState {
  constructor(private readonly orderService: OrdersService) {
  }

  isCheckout: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  carts: BehaviorSubject<{ quantity: number, product: ProductModel }[]>
    = new BehaviorSubject<{ quantity: number, product: ProductModel }[]>([]);


  addToCart(cart: { quantity: number, product: ProductModel }): void {
    const cartAlreadyExistIndex = this.findIndexOfAProduct(cart.product.id);
    if (cartAlreadyExistIndex >= 0) {
      this.carts.value[cartAlreadyExistIndex].quantity++;
    } else {
      this.carts.value.push(cart);
    }
    this.carts.next(this.carts.value);
  }

  removeItemToCart(productId: string): void {
    this.carts.next(this.carts.value.filter(x => x.product.id !== productId));
  }

  decrementItemFromCart(productId: string): void {
    const cartAlreadyExistIndex = this.findIndexOfAProduct(productId);
    if (cartAlreadyExistIndex >= 0) {
      if (this.carts.value[cartAlreadyExistIndex].quantity > 1) {
        this.carts.value[cartAlreadyExistIndex].quantity--;
      }
    }
  }

  incrementItemFromCart(productId: string): void {
    const cartAlreadyExistIndex = this.findIndexOfAProduct(productId);
    if (cartAlreadyExistIndex >= 0) {
      this.carts.value[cartAlreadyExistIndex].quantity++;
    }
  }

  async checkOut(user: any, mobile: string): Promise<any> {
    this.isCheckout.next(true);
    const response = await this.orderService.saveOrder({
      paid: false,
      total: this.carts.value.map(x => x.quantity * x.product.retailPrice).reduce((a, b) => a + b, 0),
      user,
      carts: this.carts.value,
      mobile,
      status: 'PROCESSED',
      userId: user.id ? user.id : user.uid
    });
    this.carts.next([]);
    this.isCheckout.next(false);
    return response;
  }

  private findIndexOfAProduct(productId: string): number {
    let cartAlreadyExistIndex = -1;
    this.carts.value.forEach((value, index) => {
      if (value.product.id === productId) {
        cartAlreadyExistIndex = index;
      }
    });
    return cartAlreadyExistIndex;
  }
}
