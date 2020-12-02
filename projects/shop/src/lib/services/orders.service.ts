import {Injectable} from '@angular/core';
import {BFast} from 'bfastjs';
import {OrderModel} from '../models/order.model';

@Injectable({
  providedIn: 'root'
})

export class OrdersService {
  saveOrder(order: OrderModel): Promise<any>{
    return BFast.database()
      .table('orders')
      .save(order);
  }
}
