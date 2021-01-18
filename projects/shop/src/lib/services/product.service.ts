import {Injectable} from '@angular/core';
import {ProductModel} from '../models/product.model';
import {bfast, BFast} from 'bfastjs';
import {ProductByCategoryModel} from '../models/product-by-category.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  async getProductsByCategory(category: string, page: { size: number; skip: number } = {skip: 0, size: 20}): Promise<ProductModel[]> {
    return BFast.database()
      .collection('stocks')
      .query()
      .size(page.size)
      .skip(page.skip)
      .searchByRegex('category', category)
      .find();
  }

  async orderProductsByCategory(size = 20, skip = 0): Promise<ProductByCategoryModel[]> {
    return BFast.database().collection('stocks').query()
      .aggregate([
        {
          $sort: {
            _created_at: -1,
            category: 1
          }
        },
        {
          $group: {
            _id: '$category',
            items: {
              $push: {
                product: '$product',
                retailPrice: '$retailPrice',
                unit: '$unit',
                image: '$image',
                category: '$category',
                catalog: '$catalog',
                downloads: '$downloads',
                id: '$_id'
              }
            }
          }
        },
        {
          $project: {
            products: {
              $slice: ['$items', 8]
            },
            category: '$id'
          }
        },
        {
          $skip: skip
        },
        {
          $limit: size
        }
      ], {useMasterKey: true});
  }

  async searchProducts(
    searchItem: string,
    page: { size: number; skip: number } = {skip: 0, size: 20}
  ): Promise<ProductModel[]> {
    return BFast.database()
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

  async getCategories(): Promise<any[]> {
    return BFast.database().collection('categories').getAll();
  }

  async getProduct(id: string): Promise<ProductModel> {
    return bfast.database().table('stocks').get(id);
  }
}
