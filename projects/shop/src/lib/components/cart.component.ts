import {Component, OnInit} from '@angular/core';
import {CartState} from '../states/cart.state';

@Component({
  selector: 'app-cart',
  template: `
    <div class="shop-container">
      <app-on-fetch *ngIf="(cartState.carts.value.length === 0)"
                    (refreshCallback)="cartState.fetchCarts()"
                    [isLoading]="cartState.loadCarts | async">
      </app-on-fetch>
      <app-cart-item [cart]="cart" *ngFor="let cart of cartState.carts | async"></app-cart-item>
      <app-pay-now></app-pay-now>
    </div>
  `,
  styleUrls: ['../styles/shop.style.scss']
})

export class CartComponent implements OnInit {
  constructor(public readonly cartState: CartState) {
  }

  ngOnInit(): void {
    this.cartState.fetchCarts();
  }
}
