import {OrderShippingModel} from './order-shipping.model';
import {CartModel} from './cart.model';
import {CustomerModel} from './customer.model';

export type OrderModel = {
  paid: boolean;
  id?: string;
  createdAt: any;
  updatedAt: any;
  total: number;
  date: any;
  orderRef?: string;
  channel: string;
  items: CartModel[];
  customer: CustomerModel;
  shipping: OrderShippingModel;
  placedBy: {
    username: string;
    firstname: string;
    lastname: string
  };
  status: 'PENDING' | 'PROCESSED' | 'DELIVERED' | 'COMPLETED' | 'CANCELLED';
};
