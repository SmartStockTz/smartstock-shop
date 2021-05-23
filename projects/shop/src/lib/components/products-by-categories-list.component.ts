import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductByCategoryModel} from '../models/product-by-category.model';
import {ProductState} from '../states/product.state';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {CategoryState} from '../states/category.state';
import {ConfigService} from '../services/config.service';

@Component({
  template: `
    <div class="container">
      <div>
        <div *ngFor="let product of products">
          <div class="d-flex flex-row">
            <h2>{{product.id}}</h2>
            <span style="flex: 1 1 auto"></span>
            <button (click)="selectedCategory(product.id)" routerLink="/shops/{{projectId}}/products" [queryParams]="{category: product.id}"
                    color="primary" style="border-radius: 30px"
                    mat-flat-button>View More
            </button>
          </div>
          <hr>
          <div style="margin-bottom: 48px">
            <app-products-list [products]="product.products"></app-products-list>
          </div>
        </div>
      </div>
      <div *ngIf="!products || products.length === 0">
        <div class="row">
          <div *ngFor="let i of [1, 2, 3, 4, 5, 6, 7, 8]" class="col-xl-3 col-lg-3 col-sm-12 col-md-4">
            <div style="height: 200px; background: #f5f5f5; margin: 5px 0"></div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center align-items-center" *ngIf="products || products.length > 0">
        <button routerLink="/shops/{{projectId}}/products" mat-flat-button
                class="see-more-button" color="primary">
          SEE MORE PRODUCTS
        </button>
      </div>
    </div>
  `,
  selector: 'ssm-products-by-categories-list',
  styleUrls: ['../styles/product.style.scss']
})
export class ProductsByCategoriesListComponent implements OnInit, OnDestroy {
  products: ProductByCategoryModel[] = [];
  destroy: Subject<any> = new Subject<any>();
  projectId: string;

  constructor(private readonly productsState: ProductState,
              private readonly config: ConfigService,
              private readonly categoryState: CategoryState) {
    productsState.productsOrderByCategories.pipe(
      takeUntil(this.destroy)
    ).subscribe(value => {
      this.products = value;
    });
  }

  ngOnInit(): void {
    this.productsState.getProductsOrderByCategories();
    this.projectId = this.config.shopDetails.value.projectId;
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }


  selectedCategory(id: string): void {
    this.categoryState.selectedCategorySubject.next(id);
  }
}
