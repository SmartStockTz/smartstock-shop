import {ProductModel} from './product.model';

export interface OrderModel {
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
  user: object;
}
