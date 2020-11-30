import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';
import {CategoryModel, ProductModel} from '../models/product.model';
import {BFast} from 'bfastjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-products',
  template: `
    <app-navibar [user]="user"></app-navibar>
    <section>
      <div class="gap100">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              <div class="shop-page">
                <div
                  class="shop-filter-sec"
                  style="margin-left: 5em; font-weight: 600;"
                >
                  <span
                  >Showing {{ products.length }} of
                    {{ totalProducts }} results</span
                  >
                </div>
                <div class="row" style="padding-top: 3em">
                  <div class="col-lg-3 col-md-3">
                    <ssm-category-list></ssm-category-list>
                  </div>
                  <div class="col-lg-9 col-md-9">
                    <ssm-products-by-category></ssm-products-by-category>
                  </div>
                </div>
                <!-- <div *ngIf="!products || products.length === 0">
                  <div class="row">
                    <div
                      *ngFor="let i of [1, 2, 3, 4, 5, 6, 7, 8]"
                      class="col-xl-3 col-lg-3 col-sm-12 col-md-4"
                    >
                      <div
                        style="height: 200px; background: #f5f5f5; margin: 5px 0"
                      ></div>
                    </div>
                  </div>
                </div>
                <app-products-list [products]="products"></app-products-list> -->
                <!-- <div
                  style="padding: 24px; display: flex; justify-content: center; align-items: center"
                >
                  <button
                    [disabled]="isLoadMore"
                    (click)="loadMoreProducts()"
                    class="btn btn-primary"
                  >
                    Load More Products
                    <div *ngIf="isLoadMore" class="spinner-border"></div>
                  </button>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <app-cart-preview></app-cart-preview>
    </section>
    <a class="shopping-cart" title=""><i class="fa fa-shopping-bag"></i><span>02</span></a>
    <app-footer [user]="user"></app-footer>
  `,
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  products: ProductModel[] = [];
  changes = BFast.database().table('stocks').query().changes();
  totalProducts = 0;
  isLoadMore = false;
  categories = [];

  user: { [key: string]: any } = {ecommerce: {social: {}, logo: '', cover: ''}, businessName: '', email: ''};

  constructor(
    private readonly productService: ProductService,
    private readonly snack: MatSnackBar,
    private readonly userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.userService.profile().then(user => {
      this.user = user;
    }).catch(reason => {
      console.log(reason);
    });
    window.scrollTo({
      top: 0,
    });
    this.productService.getTotalAvailableProducts().then((value) => {
      if (value) {
        this.totalProducts = value;
      }
    });
    this.productService
      .getProducts()
      .then((value) => {
        this.products = value;
      })
      .catch((reason) => {
        console.log(reason);
      });
    this.changes.addListener((response) => {
      if (response.body.change && response.body.change.name === 'create') {
        this.products.push(response.body.change.snapshot);
      }
    });

    this.productService.getcategories().then((val) => {
      val.forEach((value: CategoryModel) => {
        this.categories.push(value.name);
      });
    });
  }

  ngOnDestroy(): void {
    this.changes.close();
  }

  loadMoreProducts(): void {
    this.isLoadMore = true;
    this.productService
      .getProducts({
        size: 20,
        skip: this.products.length,
      })
      .then((value) => {
        if (value && value.length === 0) {
          this.snack.open('No More Products', 'Ok', {
            duration: 2000,
          });
        } else if (value && value.length > 0) {
          this.products.push(...value);
        }
      })
      .catch((reason) => {
        console.log(reason);
      })
      .finally(() => {
        this.isLoadMore = false;
      });
  }
}
