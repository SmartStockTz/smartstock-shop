import {ProductModel} from './product.model';

export interface OrderModel {
  displayName?: any;
  id?: string;
  userId?: string;
  carts?: {
    quantity: number,
    product: ProductModel
  }[];
  paid?: boolean;
  mobile?: string;
  status?: string;
  total?: number;
  user: any;
}
