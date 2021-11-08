import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {CartModel} from '../models/cart.model';
import {CartService} from '../services/cart.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartState {
  loadCarts = new BehaviorSubject(false);
  totalCarts = new BehaviorSubject(0);
  totalCost = new BehaviorSubject(0);
  serviceCharge = new BehaviorSubject(0);
  // addToCartLoad = new BehaviorSubject(false);
  carts: BehaviorSubject<CartModel[]> = new BehaviorSubject<CartModel[]>([]);

  constructor(private readonly cartService: CartService,
              private readonly snack: MatSnackBar) {
  }

  private info(message: string): void {
    this.snack.open(message, 'Ok', {
      duration: 1000
    });
  }

  private findServiceCharge(x: number): void {
    if (x === 0) {
      this.serviceCharge.next(0);
    } else {
      const smartstockCost = 2000;
      const mLipaRate = 0.04;
      x = x + smartstockCost;
      const y = Math.round(x / (1 - mLipaRate));
      const serviceC = (y - x) + smartstockCost;
      this.serviceCharge.next(serviceC);
    }
  }

  private findTotalCost(): void {
    const total = this.carts.value.reduce((a, b) => {
      const price = b.channel === 'retail' ? b.product.retailPrice : b.product.wholesalePrice;
      return a + (b.quantity * price);
    }, 0);
    this.findServiceCharge(total);
    this.totalCost.next(total);
  }

  fetchCarts(): void {
    this.loadCarts.next(true);
    this.cartService.getCarts().then(value => {
      if (Array.isArray(value)) {
        this.carts.next(value);
        this.totalCarts.next(value.reduce((a, b) => a + b.quantity, 0));
        this.findTotalCost();
      }
    }).catch(reason => {
      console.log(reason);
      this.info(reason && reason.message ? reason.message : reason.toString());
    }).finally(() => {
      this.loadCarts.next(false);
    });
  }

  async addToCart(cart: CartModel): Promise<any> {
    // this.addToCartLoad.next(true);
    return this.cartService.addToCart(cart).then(_1 => {
      return this.fetchCarts();
    }).finally(() => {
      // this.addToCartLoad.next(false);
    });
  }

  removeToCart(id: string): void {
    // this.addToCartLoad.next(true);
    this.cartService.removeToCart(id).then(_1 => {
      this.fetchCarts();
    }).finally(() => {
      // this.addToCartLoad.next(false);
    });
  }

  incrementCart(id: string, quantity: number): void {
    // this.addToCartLoad.next(true);
    this.cartService.incrementCart(id, quantity).then(_1 => {
      this.fetchCarts();
    }).finally(() => {
      // this.addToCartLoad.next(false);
    });
  }

  clearCart(): void {
    this.loadCarts.next(true);
    this.cartService.clearCart().then(_1 => {
      this.fetchCarts();
    });
  }
}
