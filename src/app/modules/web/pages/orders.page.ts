import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderState} from '../states/orders.state';

@Component({
  selector: 'app-orders-page',
  template: `
    <app-navibar></app-navibar>
    <app-my-orders></app-my-orders>
    <app-footer></app-footer>
  `
})
export class OrdersPage implements OnInit, OnDestroy {
  constructor(private readonly orderState: OrderState) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.orderState.orders.next([]);
  }

}
