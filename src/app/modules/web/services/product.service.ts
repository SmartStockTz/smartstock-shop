import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { BFast } from 'bfastjs';
import { pipeline } from 'stream';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  async getProductsByCategory(category: string, page: { size: number; skip: number } = { skip: 0, size: 20 }): Promise<ProductModel[]> {
      return BFast.database().collection('stocks').query().aggregate([
          {
            "$match": {
              "category"	:	category
            }
          },
          {
            "$sort": {
              "id": 1
            }
          },
          {
            "$skip": page.skip
          },
          {
            "$limit": page.size
          }
      ], { useMasterKey: true,
        returnFields: []});
  }

  async getProducts(
    page: { size: number; skip: number } = { skip: 0, size: 20 }
  ): Promise<ProductModel[]> {
    return BFast.database()
      .table('stocks')
      .query()
      .orderBy('product', 1)
      .size(page.size)
      .skip(page.skip)
      .find();
  }

  async getTotalAvailableProducts(): Promise<number> {
    return BFast.database().table('stocks').query().count(true).find();
  }

  async getcategories() {
    return BFast.database().collection('categories').getAll();
  }
}
