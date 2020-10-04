import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {OrderModel} from '../models/order.model';
import {OrderService} from '../services/order.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'any'
})
export class OrderState {

  orders: BehaviorSubject<OrderModel[]> = new BehaviorSubject<OrderModel[]>([]);
  orderFilterKeyword: BehaviorSubject<string> = new BehaviorSubject<string>('');
  getOrderFlag: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private readonly orderService: OrderService,
              private readonly snackBar: MatSnackBar) {
  }

  getOrder(size = 20, skip = 0): void {
    this.getOrderFlag.next(true);
    this.orderService.getOrders(size, skip).then(value => {
      this.orders.next(value);
    }).catch(_ => {
      console.log(_);
      this.snackBar.open('Fails to fetch orders', 'Ok', {
        duration: 2000
      });
    }).finally(() => {
      this.getOrderFlag.next(false);
    });
  }
}
