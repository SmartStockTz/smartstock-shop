import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductModel} from '../models/product.model';
import {CategoryState} from '../states/category.state';
import {ProductState} from '../states/product.state';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  template: `
    <div class="container">
      <div class="row d-flex flex-row align-items-center">
        <div>
          <h1>{{category}}</h1>
        </div>
        <span style="flex: 1 1 auto"></span>
        <!--        <div class="col-lg-9 col-md-9" style="display: flex; justify-content: end;">-->
        <!--          <span style="flex: 3"></span>-->
        <!--          <ssm-search style="flex: 1"></ssm-search>-->
        <!--        </div>-->
        <ssm-category-list></ssm-category-list>
      </div>

      <div *ngIf="(productState.isFetchProduct | async) === true">
        <div class="row">
          <div *ngFor="let i of [1, 2, 3, 4, 5, 6, 7, 8]" class="col-xl-3 col-lg-3 col-sm-12 col-md-4">
            <div style="height: 200px; background: #f1f1f1; margin: 5px 0"></div>
          </div>
        </div>
      </div>
      <app-products-list *ngIf="(productState.isFetchProduct | async)===false"
                         [products]="productState.products | async">
      </app-products-list>

      <div style="padding: 8px;" *ngIf="(productState.isFetchProduct | async)===false">
        <div style="padding: 24px; display: flex; justify-content: center; align-items: center">
          <button
            [disabled]="(productState.isFetchMoreProduct | async) === true"
            (click)="loadMoreProducts()"
            style="border-radius: 50px"
            mat-flat-button color="primary">
            Load More Products
            <div *ngIf="(productState.isFetchMoreProduct | async) === true" class="spinner-border"></div>
          </button>
        </div>
      </div>
    </div>
  `,
  selector: 'ssm-products-by-category',
  styleUrls: []
})
export class ProductsCategoryComponent implements OnInit, OnDestroy {
  // categoryTitle: string;
  searchItem: string;
  products: ProductModel[] = [];
  category = 'All Products';
  destroy: Subject<any> = new Subject<any>();

  constructor(public readonly productState: ProductState,
              private readonly categoryState: CategoryState) {
    categoryState.selectedCategorySubject.pipe(
      takeUntil(this.destroy)
    ).subscribe(value => {
      if (value === 'All Products') {
        value = null;
      }
      if (value && typeof value === 'string') {
        this.category = value;
        productState.getProductsFilterByCategory(this.category === 'All Products' ? '' : this.category);
      } else {
        this.category = 'All Products';
        productState.getProductsFilterByCategory('');
      }
    });

  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  ngOnInit(): void {

  }


  loadMoreProducts(): void {
    this.productState.loadMoreProductsWithCategoryFilter(
      this.category === 'All Products' ? '' : this.category,
      20,
      this.productState.products.value.length
    );
  }

}
