import {Injectable} from '@angular/core';
import {ProductModel} from '../models/product.model';
import {ProductByCategoryModel} from '../models/product-by-category.model';
import { database } from 'bfast';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  async getProductsByCategory(category: string, page: { size: number; skip: number } = {skip: 0, size: 20}): Promise<ProductModel[]> {
    return database()
      .collection('stocks')
      .query()
      .size(page.size)
      .skip(page.skip)
      .searchByRegex('category', category)
      .find();
  }

  async orderProductsByCategory(size = 20, skip = 0): Promise<ProductByCategoryModel[]> {
    return database().collection('stocks').aggregate()
    .stage( {
      $sort: {
        _created_at: -1,
        category: 1
      }
    }).stage({
      $group: {
        _id: '$category',
        items: {
          $push: {
            product: '$product',
            retailPrice: '$retailPrice',
            unit: '$unit',
            images: '$images',
            category: '$category',
            catalog: '$catalog',
            downloads: '$downloads',
            id: '$_id'
          }
        }
      }
    }).stage({
      $project: {
        products: {
          $slice: ['$items', 8]
        },
        category: '$id'
      }
    }).stage({
      $skip: skip
    }).stage({
      $limit: size
    }).find({useMasterKey: true});
  }

  async searchProducts(
    searchItem: string,
    page: { size: number; skip: number } = {skip: 0, size: 20}
  ): Promise<ProductModel[]> {
    return database()
      .collection('stocks')
      .query()
      .searchByRegex('product', searchItem)
      .skip(page.skip)
      .size(page.size)
      .find();
  }

  async getProducts(
    page: { size: number; skip: number } = {skip: 0, size: 20}
  ): Promise<ProductModel[]> {
    return database()
      .table('stocks')
      .query()
      .orderBy('product', 'asc')
      .size(page.size)
      .skip(page.skip)
      .find();
  }

  async getTotalAvailableProducts(): Promise<number> {
    return database().table('stocks').query().count(true).find();
  }

  async getCategories(): Promise<any[]> {
    return database().collection('categories').getAll();
  }
}
