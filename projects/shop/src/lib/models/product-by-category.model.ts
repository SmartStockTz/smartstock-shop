import {StockModel} from './stock.model';

export interface ProductByCategoryModel {
  id?: string;
  products: StockModel[];
}
