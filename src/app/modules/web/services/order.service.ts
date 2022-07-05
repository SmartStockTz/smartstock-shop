import {Injectable} from '@angular/core';
import { database } from 'bfast';
import {OrderModel} from '../models/order.model';

@Injectable({
  providedIn: 'any'
})
export class OrderService {

  constructor() {
  }

  async getOrders(user: any): Promise<OrderModel[]> {
    const total: number = await database().collection('orders').query().count(true).find();
    const orders = await database().collection('orders')
      .query()
      .equalTo('userId', user.id)
      .skip(0)
      .size(total)
      .orderBy('_created_at', 'desc')
      .find<OrderModel[]>();
    return orders.map<OrderModel>(x => {
      x.displayName = x.user.displayName;
      return x;
    });
  }

  async markOrderIsPaid(orderId: string): Promise<any> {
    // console.log(orderId);
    return database().collection('orders')
      .query()
      .byId(orderId)
      .updateBuilder()
      .set('paid', true)
      .update();
  }

  // async checkOrderIsPaid(order: string): Promise<any> {
  //   const payments = await BFast.functions('fahamupay')
  //     .request(`/functions/pay/check/${order}`)
  //     .get<any[]>();
  //   return payments.map(x => Math.round(Number(x.amount))).reduce((a, b) => a + b, 0);
  // }
}
