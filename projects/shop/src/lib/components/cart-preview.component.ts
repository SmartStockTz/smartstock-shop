import {Component, OnInit} from '@angular/core';
import {CartState} from '../states/cart.state';

@Component({
  selector: 'app-cart-preview',
  template: `
    <button routerLink="/checkout" mat-raised-button color="primary"
            style="position: fixed; bottom: 24px;
            z-index: 10000000;
             right: 24px; border-radius: 50px;
             height: 58px; font-size: 20px">
      <mat-icon>
        shopping_cart
      </mat-icon>
      CART ITEMS {{itemsInCart}} = {{totalCost | currency: 'TZS '}}
    </button>
  `
})
export class CartPreviewComponent implements OnInit {
  itemsInCart = 0;
  totalCost = 0;

  constructor(public readonly cartState: CartState) {
  }

  ngOnInit(): void {
    this.cartState.carts.subscribe(value => {
      if (value) {
        this.itemsInCart = value
          .map(x => x.quantity)
          .reduce((a, b) => a + b, 0);
        this.totalCost = value
          .map(x => x.quantity * x.product.retailPrice)
          .reduce((a, b) => a + b, 0);
      }
    });
  }

}
