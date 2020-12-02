import {Injectable} from '@angular/core';
import {ProductService} from '../services/product.service';
import {BehaviorSubject} from 'rxjs';
import {ProductByCategoryModel} from '../models/product-by-category.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ProductModel} from '../models/product.model';

@Injectable({
  providedIn: 'any'
})

export class ProductState {

  totalProducts: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  productsOrderByCategories: BehaviorSubject<ProductByCategoryModel[]> = new BehaviorSubject<ProductByCategoryModel[]>([]);
  products: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([]);
  isFetchProductsGroupedByCategory: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isFetchProduct: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isFetchMoreProduct: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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

  getProductsFilterByCategory(category: string = '', size = 8, skip = 0): void {
    this.isFetchProduct.next(true);
    this.productsService.getProductsByCategory(category, {skip, size}).then(value => {
      this.products.next(value);
    }).catch(reason => {
      this.snack.open(reason && reason.message ? reason.message : reason.toString(), 'Ok', {duration: 3000});
    }).finally(() => {
      this.isFetchProduct.next(false);
    });
  }

  loadMoreProductsWithCategoryFilter(category: string = '', size = 8, skip = 0): void {
    this.isFetchMoreProduct.next(true);
    this.productsService.getProductsByCategory(category, {skip, size}).then(value => {
      this.products.value.push(...value);
      this.products.next(this.products.value);
    }).catch(reason => {
      this.snack.open(reason && reason.message ? reason.message : reason.toString(), 'Ok', {duration: 3000});
    }).finally(() => {
      this.isFetchMoreProduct.next(false);
    });
  }

  getTotalAvailableProducts(): void {
    this.productsService.getTotalAvailableProducts().then(value => {
      this.totalProducts.next(value);
    });
  }
}
