import {Injectable} from '@angular/core';
import { database } from 'bfast';
import {OrderModel} from '../models/order.model';

@Injectable({
  providedIn: 'root'
})

export class OrdersService {
  saveOrder(order: OrderModel): Promise<any>{
    return database()
      .table('orders')
      .save(order);
  }
}
