import {Injectable} from '@angular/core';
import {ProductService} from '../services/product.service';
import {BehaviorSubject} from 'rxjs';
import {ProductByCategoryModel} from '../models/product-by-category.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'any'
})

export class ProductState {

  productsOrderByCategories: BehaviorSubject<ProductByCategoryModel[]> = new BehaviorSubject<ProductByCategoryModel[]>([]);
  isFetchProductsGroupedByCategory: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private readonly productsService: ProductService,
              private readonly snack: MatSnackBar) {
  }

  getProductsOrderByCategories(size = 8, skip = 0): void {
    this.isFetchProductsGroupedByCategory.next(true);
    this.productsService.orderProductsByCategory(size, skip).then(value => {
      this.productsOrderByCategories.next(value);
    }).catch(reason => {
      this.snack.open(reason && reason.message ? reason.message : reason.toString(), 'Ok', {duration: 3000});
    }).finally(() => {
      this.isFetchProductsGroupedByCategory.next(false);
    });
  }
}
