import {Injectable} from '@angular/core';
import {cache, database, functions} from 'bfast';
import {OrderShippingModel} from '../models/order-shipping.model';
import {OrderModel} from '../models/order.model';
import {UserService} from '@smartstocktz/core-libs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private readonly userService: UserService) {
  }

  async userCachedLastBillingAddress(uid: string): Promise<OrderShippingModel> {
    const df: OrderShippingModel = {email: '', location: '', mobile: '', mode: 'pickup', notes: ''};
    if (typeof uid !== 'string') {
      return df;
    }
    const r = await cache({database: 'e-commerce-cache', collection: 'shipping'}).get(uid);
    if (r && typeof r === 'object') {
      return r as OrderShippingModel;
    }
    return df;
  }

  async saveUserCachedLastBillingAddress(uid: string, shipping: OrderShippingModel): Promise<OrderShippingModel> {
    if (typeof uid !== 'string') {
      throw {message: 'uid must be string'};
    }
    if (shipping && shipping.mode && shipping.email && shipping.mobile && shipping.notes && shipping.location) {
      await cache({database: 'e-commerce-cache', collection: 'shipping'}).set(uid, shipping);
      return shipping;
    } else {
      throw {message: 'shipping object is invalid'};
    }
  }

  async saveOrder(order: OrderModel): Promise<OrderModel> {
    try {
      return await functions().request('/mall/orders').post(order);
    } catch (e) {
      if (e && e.response && e.response.data) {
        throw e.response.data.message ? e.response.data : {message: e.response.data.toString()};
      }
      if (e && e.message) {
        throw e;
      }
      throw {message: e.toString()};
    }
  }

  async fetchPendingOrders(): Promise<OrderModel[]> {
    const user = await this.userService.currentUser();
    return database().table('orders').query()
      .equalTo('status', 'PENDING')
      .equalTo('customer.id', user.id)
      .find();
  }

  async fetchOrder(id: string): Promise<OrderModel> {
    return database().table('orders').get(id.toString());
  }
}
