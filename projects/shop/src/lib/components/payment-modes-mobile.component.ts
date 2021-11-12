import {Component, Input} from '@angular/core';
import {MobilePaymentModel} from '../models/mobile-payment.model';

@Component({
  selector: 'app-payment-modes-mobile',
  template: `
    <div class="product-container">
      <div class="product-head">
        <span class="name">{{mode.name}}</span>
        <span style="flex: 1 1 auto"></span>
      </div>
      <hr class="line">
      <div class="mobile-mode-body">
        <img src="{{mode.logo}}" alt="{{mode.name}}" class="mobile-mode-body-logo">
        <p class="mobile-mode-body-details" [innerHTML]="mode.instructions"></p>
      </div>
    </div>
  `,
  styleUrls: ['../styles/order.style.scss']
})
export class PaymentModesMobileComponent {
  @Input() mode: MobilePaymentModel;

  constructor() {
  }
}
