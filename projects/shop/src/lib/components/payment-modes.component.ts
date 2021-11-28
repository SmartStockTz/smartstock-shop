import {Component, Input, OnInit} from '@angular/core';
import {OrderModel} from '../models/order.model';
import {CartState} from '../states/cart.state';
import {functions} from 'bfast';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MobilePaymentModel} from '../models/mobile-payment.model';

@Component({
  selector: 'app-payment-modes',
  template: `
    <div class="line payment-mode-container">
      <span class="invoice-number">Payments Modes</span>
      <span class="line-space"></span>
    </div>
    <mat-tab-group class="t" mat-align-tabs="center">

      <mat-tab label="Mobile">
        <div style="margin-bottom: 24px"></div>
        <app-payment-modes-mobile [mode]="mobile" *ngFor="let mobile of mobileModes"></app-payment-modes-mobile>
      </mat-tab>

      <mat-tab label="Visa / MasterCard">
        <div class="card-container">
          <div class="invoice-number card-item">Total</div>
          <div class="invoice-number-body card-item">Tsh {{total | number}}</div>
          <button [disabled]="loadCardUrl" (click)="payCard()" class="card-item" color="primary" mat-flat-button>
            Pay with VISA / Mastercard
            <mat-progress-spinner *ngIf="loadCardUrl" diameter="20" color="primary"
                                  mode="indeterminate" style="display: inline-block">
            </mat-progress-spinner>
          </button>
        </div>
      </mat-tab>

    </mat-tab-group>
  `,
  styleUrls: ['../styles/order-header.style.scss']
})

export class PaymentModesComponent implements OnInit {
  @Input() order: OrderModel;
  total = 0;
  link = '';
  loadCardUrl = false;
  mobileModes: MobilePaymentModel[];

  constructor(private readonly cartState: CartState,
              private readonly snack: MatSnackBar) {
  }

  ngOnInit(): void {
    const fee = this.cartState.findServiceCharge(this.order.total);
    this.total = this.order.total + fee;
    const mobile = encodeURIComponent(this.order.shipping.mobile);
    const reference = encodeURIComponent(this.order.id);
    this.link = `https://fahamupay-faas.bfast.fahamutech.com/functions/pay/card?mobile=${mobile}&reference=${reference}&amount=${this.total}`;
    this.mobileModes = [
      {
        name: 'M-PESA',
        logo: 'https://smartstock-daas.bfast.fahamutech.com/storage/smartstock_lb/file/716e2e54-739d-495c-9500-4c3d4c16ff8b/thumbnail?width=132',
        total: this.total,
        reference: this.order.id,
        instructions: [
          '1. Piga *150*00#',
          '2. Chagua namba 4',
          '3. Chagua namba 4',
          '4. Weka <b>400700</b> kama namba ya kampuni',
          `5. Weka <b>${this.order.orderRef}</b> kama kumbukumbu namba`,
          `6. Weka <b>${this.total}</b> kama kiasi`,
          '7. Weka namba ya siri',
          '8. Jina kampuni litatokea MLIPA, Thibitisha'
        ].join('<br>')
      },
      {
        name: 'TIGO-PESA',
        logo: 'https://smartstock-daas.bfast.fahamutech.com/storage/smartstock_lb/file/d028828e-add6-4590-b6a1-0627a837ebe1/thumbnail?width=132',
        total: this.total,
        reference: this.order.id,
        instructions: [
          '1. Piga *150*01#',
          '2. Chagua namba 4',
          '3. Chagua namba 3',
          '4. Weka <b>400700</b> kama namba ya kampuni',
          `5. Weka <b>${this.order.orderRef}</b> kama kumbukumbu namba`,
          `6. Weka <b>${this.total}</b> kama kiasi`,
          '7. Weka namba ya siri'
        ].join('<br>')
      },
      {
        name: 'HALO-PESA',
        logo: 'https://smartstock-daas.bfast.fahamutech.com/storage/smartstock_lb/file/4885b5d1-f2df-4a2b-833c-eb7857763429/thumbnail?width=132',
        total: this.total,
        reference: this.order.id,
        instructions: [
          '1. Piga *150*88#',
          '2. Chagua namba 4',
          '3. Chagua namba 3',
          '4. Weka <b>400700</b> kama namba ya kampuni',
          `5. Weka <b>${this.order.orderRef}</b> kama kumbukumbu namba`,
          `6. Weka <b>${this.total}</b> kama kiasi`,
          '7. Weka namba ya siri',
          '8. Thibitisha'
        ].join('<br>')
      },
      {
        name: 'AIRTEL-MONEY',
        logo: 'https://smartstock-daas.bfast.fahamutech.com/storage/smartstock_lb/file/6130c062-f6fd-4617-8ee8-9adac4b9a830/thumbnail?width=132',
        total: this.total,
        reference: this.order.id,
        instructions: [
          '1. Piga *150*60#',
          '2. Chagua namba 5',
          '3. Chagua namba 4',
          '4. Weka <b>400700</b> kama namba ya kampuni',
          `5. Weka <b>${this.total}</b> kama kiasi`,
          `6. Weka <b>${this.order.orderRef}</b> kama kumbukumbu namba`,
          '7. Weka namba ya siri',
          '8. Thibitisha'
        ].join('<br>')
      }
    ];
  }

  payCard(): void {
    this.loadCardUrl = true;
    functions().request(this.link).get().then(value => {
      // @ts-ignore
      window.open(value ? value.url : '', 'blank');
    }).catch(reason => {
      this.snack.open(reason && reason.message ? reason.message : reason.toString(), 'Ok', {
        duration: 2000
      });
    }).finally(() => {
      this.loadCardUrl = false;
    });
  }
}
