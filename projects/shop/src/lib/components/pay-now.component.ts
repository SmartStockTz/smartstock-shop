import {Component} from '@angular/core';
import {CartState} from '../states/cart.state';

@Component({
  selector: 'app-pay-now',
  template: `
    <div *ngIf="(cartState.totalCost | async)>0" class="pay-now-container">
      <button mat-raised-button color="primary" class="pay-button">
        <span class="pay-button-text">PAY NOW [ Tsh {{cartState.totalCost | async | number}} ]</span>
      </button>
    </div>
  `,
  styleUrls: ['../styles/pay-now.style.scss', '../styles/cart-drawer.style.scss']
})

export class PayNowComponent {
  constructor(public readonly cartState: CartState) {
  }
}
