import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CartState} from '../states/cart.state';
import {OrderState} from '../states/order.state';

@Component({
  selector: 'app-pay-now',
  template: `
    <div *ngIf="(cartState.totalCost | async)>0" class="pay-now-container">
      <button color="primary" routerLink="../checkout" *ngIf="view === 'checkout'" mat-flat-button class="pay-button">
        <span class="pay-button-text">CHECKOUT [ Tsh {{cartState.totalCost | async | number}} ]</span>
      </button>
      <button color="primary" routerLink="./cart" *ngIf="view === 'cart'" mat-flat-button class="pay-button">
        <span class="pay-button-text">VIEW CART [ Tsh {{cartState.totalCost | async | number}} ]</span>
      </button>
      <button [disabled]="orderState.saveOrderProgress | async" mat-flat-button color="primary"
              (click)="saveOrderAndGoToPayments()" *ngIf="view === 'pay'" class="pay-button">
        <span class="pay-button-text">PAY NOW [ Tsh {{cartState.totalCost | async | number}} ]</span>
        <mat-progress-spinner *ngIf="orderState.saveOrderProgress | async"
                              style="display: inline-block" [diameter]="20" mode="indeterminate"></mat-progress-spinner>
      </button>
    </div>
  `,
  styleUrls: ['../styles/pay-now.style.scss', '../styles/cart-drawer.style.scss']
})

export class PayNowComponent {
  @Input() view = 'cart';
  @Output() pay = new EventEmitter();

  constructor(public readonly cartState: CartState,
              public readonly orderState: OrderState) {
  }

  saveOrderAndGoToPayments(): void {
    this.pay.emit();
  }
}
