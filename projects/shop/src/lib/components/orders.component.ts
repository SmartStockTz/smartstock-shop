import {Component, OnInit} from '@angular/core';
import {OrderState} from '../states/order.state';

@Component({
  selector: 'app-orders',
  template: `
    <div class="order-container">
      <app-on-fetch *ngIf="(orderState.orders.value.length === 0)"
                    (refreshCallback)="orderState.fetchPendingOrders()"
                    [isLoading]="orderState.fetchOrdersProgress | async">
      </app-on-fetch>
      <app-order [order]="order" *ngFor="let order of orderState.orders | async"></app-order>
    </div>
  `,
  styleUrls: ['../styles/orders.style.scss']
})

export class OrdersComponent implements OnInit {
  constructor(public readonly orderState: OrderState) {
  }

  ngOnInit(): void {
    this.orderState.fetchPendingOrders();
  }
}
