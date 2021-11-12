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
  fetchOrderProgress = new BehaviorSubject(false);
  orderStatusProgress = new BehaviorSubject(false);
  orders = new BehaviorSubject([]);
  order = new BehaviorSubject(null);

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

  private ifetchOrder(id: string): void {
    this.orderService.fetchOrder(id).then(value => {
      this.order.next(value);
    }).catch(reason => {
      this.snack.open(reason && reason.message ? reason.message : reason.toString(), 'Ok', {
        duration: 2000
      });
    }).finally(() => {
      this.orderStatusProgress.next(false);
      this.fetchOrderProgress.next(false);
    });
  }

  fetchOrder(id: string): void {
    this.fetchOrderProgress.next(true);
    if (this.order.value && this.order.value.id === id) {
      this.fetchOrderProgress.next(false);
      return;
    }
    this.ifetchOrder(id);
  }

  refreshStatus(id: string): void {
    this.orderStatusProgress.next(true);
    this.ifetchOrder(id);
  }
}
