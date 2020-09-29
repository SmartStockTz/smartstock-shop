import {Injectable} from '@angular/core';
import {ProductModel} from '../models/product.model';
import {BFast} from 'bfastjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  async getProducts(page: { size: number, skip: number } = {skip: 0, size: 20}): Promise<ProductModel[]> {
    return BFast.database()
      .table('stocks')
      .query()
      .orderBy('product', 1)
      .size(page.size)
      .skip(page.skip)
      .find();
  }

  async getTotalAvailableProducts(): Promise<number> {
    return BFast.database()
      .table('stocks')
      .query()
      .count(true)
      .find();
  }
}
