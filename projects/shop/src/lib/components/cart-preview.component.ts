import {Component, OnInit} from '@angular/core';
import {CartState} from '../states/cart.state';
import {ConfigService} from '../services/config.service';

@Component({
  selector: 'app-cart-preview',
  template: `
    <button routerLink="/shops/{{projectId}}/checkout" mat-raised-button color="primary"
            style="position: fixed; bottom: 24px;
            z-index: 10000000;
             right: 24px; border-radius: 50px;
             height: 58px; font-size: 18px">
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
  projectId: any;

  constructor(public readonly cartState: CartState,
              private readonly config: ConfigService) {
    this.projectId = config.shopDetails.value.projectId;
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
