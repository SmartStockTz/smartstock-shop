import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderState} from '../states/order.state';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-payment',
  template: `
    <div class="payment-container">
      <app-on-fetch *ngIf="(!orderState.order.value)"
                    (refreshCallback)="refresh()"
                    [isLoading]="orderState.fetchOrderProgress | async">
      </app-on-fetch>
      <div class="payment-container-item" *ngIf="orderState.order.value">
        <app-payment-header [order]="orderState.order | async"></app-payment-header>
        <app-payment-modes [order]="orderState.order | async"></app-payment-modes>
      </div>
    </div>
  `,
  styleUrls: ['../styles/payment.style.scss']
})

export class PaymentComponent implements OnInit, OnDestroy {
  destroyer = new Subject();

  constructor(public readonly orderState: OrderState,
              private readonly router: Router,
              public readonly activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(takeUntil(this.destroyer)).subscribe(value => {
      if (value && value.orderid) {
        this.orderState.fetchOrder(value.orderid);
      } else {
        this.router.navigate([`../../`], {relativeTo: this.activatedRoute}).catch(console.log);
      }
    });
  }

  ngOnDestroy(): void {
  }

  refresh(): void {
    this.activatedRoute.params.subscribe(value => {
      this.orderState.fetchOrder(value.orderid);
    });
  }
}
