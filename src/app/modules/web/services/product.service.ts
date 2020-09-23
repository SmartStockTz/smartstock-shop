import {Injectable} from '@angular/core';
import {ProductModel} from '../models/product.model';
import {BFast} from 'bfastjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  async getProducts(): Promise<ProductModel[]> {
    return BFast.database().table('stocks').getAll();
  }
}
