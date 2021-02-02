import {Injectable} from '@angular/core';
import {BFast} from 'bfastjs';
import {OrderModel} from '../models/order.model';

@Injectable({
  providedIn: 'any'
})
export class OrderService {

  constructor() {
  }

  async getOrders(user: any): Promise<OrderModel[]> {
    const total: number = await BFast.database().collection('orders').query().count(true).find();
    const orders = await BFast.database().collection('orders')
      .query()
      .equalTo('userId', user.id)
      .skip(0)
      .size(total)
      .orderBy('_created_at', -1)
      .find<OrderModel[]>();
    return orders.map<OrderModel>(x => {
      x.displayName = x.user.displayName;
      return x;
    });
  }

  async markOrderIsPaid(orderId: string): Promise<any> {
    return BFast.database().collection('orders')
      .query()
      .byId(orderId)
      .updateBuilder()
      .set('paid', true)
      .update();
  }

  async markOrderAsCancelled(order: OrderModel): Promise<any> {
    return BFast.database().collection('orders')
      .query()
      .byId(order.id)
      .updateBuilder()
      .set('status', 'CANCELLED').update();
  }

  // async checkOrderIsPaid(order: string): Promise<any> {
  //   const payments = await BFast.functions('fahamupay')
  //     .request(`/functions/pay/check/${order}`)
  //     .get<any[]>();
  //   return payments.map(x => Math.round(Number(x.amount))).reduce((a, b) => a + b, 0);
  // }
}
