import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {OrderService} from '../services/order.service';
import {OrderModel} from '../models/order.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class OrderState {
  saveOrderProgress = new BehaviorSubject(false);
  fetchOrdersProgress = new BehaviorSubject(false);
  orders = new BehaviorSubject([]);

  constructor(private readonly orderService: OrderService,
              private readonly snack: MatSnackBar) {
  }

  async saveOrder(order: OrderModel): Promise<any> {
    this.saveOrderProgress.next(true);
    return this.orderService.saveOrder(order).catch(reason => {
      this.snack.open(reason && reason.message ? reason.message : reason.toString(), 'Ok', {
        duration: 2000
      });
      throw reason;
    }).finally(() => {
      this.saveOrderProgress.next(false);
    });
  }

  fetchPendingOrders(): void {
    this.fetchOrdersProgress.next(true);
    this.orderService.fetchPendingOrders().then(value => {
      if (Array.isArray(value)) {
        this.orders.next(value);
      }
    }).catch(reason => {
      this.snack.open(reason && reason.message ? reason.message : reason.toString(), 'Ok', {
        duration: 2000
      });
    }).finally(() => {
      this.fetchOrdersProgress.next(false);
    });
  }
}
