import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ProductModel} from '../models/product.model';
import {ProductService} from '../services/product.service';
import {CategoryState} from '../states/category.state';
import {SearchState} from '../states/search.state';

@Component({
  template: `
    <div class="container">
      <div class="row" style="display: flex;">
        <div class="col-lg-3 col-md-3">
          <h1>{{categoryTitle}}</h1>
        </div>
        <div class="col-lg-9 col-md-9" style="display: flex; justify-content: end;">
          <span style="flex: 3"></span>
          <ssm-search style="flex: 1"></ssm-search>
        </div>
      </div>

      <div *ngIf="!products || products.length === 0">
        <div class="row">
          <div *ngFor="let i of [1, 2, 3, 4, 5, 6, 7, 8]" class="col-xl-3 col-lg-3 col-sm-12 col-md-4">
            <div style="height: 200px; background: #f5f5f5; margin: 5px 0"></div>
          </div>
        </div>
      </div>
      <app-products-list [products]="products"></app-products-list>

      <div style="padding: 8px; display: flex;">
        <span style="flex: 1 1 auto"></span>
        <button class="btn btn-primary" routerLink="/products">
          <!--            <a href="/products">-->
          view all products
          <!--            </a>-->
        </button>
      </div>
    </div>
  `,
  selector: 'ssm-products-by-category',
  styleUrls: []
})
export class ProductsCategoryComponent implements OnInit {
  categoryTitle: string;
  searchItem: string;
  products: ProductModel[] = [];

  constructor(private readonly productService: ProductService,
              private readonly categoryState: CategoryState,
              private readonly searchState: SearchState) {

  }

  ngOnInit(): void {
    this.categoryState.selectedCategorySubject.subscribe((category) => {
      this.categoryTitle = category;
      if (category == 'ALL') {
        this.productService
          .getProducts({
            skip: 0,
            size: 8,
          })
          .then((value) => {
            this.products = value;
          })
          .catch((reason) => {
            console.log(reason);
          });
      } else if (category == 'Search') {
        this.productService
          .getProducts({
            skip: 0,
            size: 8,
          })
          .then((value) => {
            this.products = value.filter((product) => product.product.includes(this.searchItem));
          })
          .catch((reason) => {
            console.log(reason);
          });
      } else {
        this.productService.getProductsByCategory(category, {
          skip: 0,
          size: 8,
        }).then((value) => {
          this.products = value;
        })
          .catch((reason) => {
            console.log(reason);
          });
      }
    });

    this.searchState.searchItem.subscribe((searchItem) => {
      this.searchItem = searchItem;
      // this.products = this.products.filter((product)=> product.product.includes(searchItem))
    });

  }


}
