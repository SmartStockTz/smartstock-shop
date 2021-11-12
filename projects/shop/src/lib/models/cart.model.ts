import {StockModel} from './stock.model';

export type CartModel = {
  id: string;
  quantity: number;
  product: StockModel;
  channel: 'retail' | 'whole';
  shop: {
    name: string,
    projectId: string,
    applicationId: string,
  };
};
