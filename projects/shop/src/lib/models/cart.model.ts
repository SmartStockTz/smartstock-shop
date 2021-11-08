import {StockModel} from './stock.model';

export type CartModel = {
  id: string;
  quantity: number;
  product: StockModel;
  shop: {
    name: string,
    projectId: string,
    applicationId: string,
  };
};
