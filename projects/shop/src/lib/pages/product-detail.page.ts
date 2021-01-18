import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from '../services/user.service';
import {ProductState} from '../states/product.state';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfigService} from '../services/config.service';
import {ProductService} from '../services/product.service';
import {CartState} from '../states/cart.state';

@Component({
  selector: 'app-products',
  template: `
    <app-navibar [user]="user"></app-navibar>
    <!--    <ssm-header [user]="user"></ssm-header>-->
    <section>
      <div>
        <div class="container">
          <div class="row">
            <div class="shop-page">
              <!--              <div class="shop-filter-sec">-->
              <!--                <span>Showing {{ productState.products.value.length }} of {{ productState.totalProducts | async }} results </span>-->
              <!--              </div>-->
              <!--              <ssm-products-by-category></ssm-products-by-category>-->
              <div class="row" *ngIf="!isGetProduct">
                <div class="col-xl-7 col-lg-7 col-md-6 col-sm-11 col-11"
                     style="display: flex; justify-content: center; align-items: center">
                  <img src="{{productState.selectedProduct.value.image}}"/>
                </div>
                <div class="col-xl-4 col-lg-4 col-md-6 col-sm-11 col-11">
                  <p>Name</p>
                  <h2>{{productState.selectedProduct.value.product}}</h2>
                  <hr>
                  <p>Price</p>
                  <h2>{{productState.selectedProduct.value.retailPrice | number}}</h2>
                  <hr>
                  <p>Description</p>
                  <h3>{{productState.selectedProduct.value.description}}</h3>
                  <button (click)="addToCart()" mat-stroked-button color="primary" style="width: 100%">
                    <mat-icon>shopping_cart</mat-icon>
                    Add To Cart
                  </button>
                  <button routerLink="/shops/{{projectId}}/products" mat-stroked-button color="primary"
                          style="margin-top: 8px; width: 100%">
                    <mat-icon>store</mat-icon>
                    Continue Shopping
                  </button>
                </div>
              </div>
              <div *ngIf="isGetProduct" style="display: flex; justify-content: center; align-items: center; height: 300px; width: 100%">
                <mat-progress-spinner mode="indeterminate" diameter="30" color="primary"></mat-progress-spinner>
              </div>
            </div>
          </div>
        </div>
      </div>
      <app-cart-preview></app-cart-preview>
    </section>
    <app-footer [user]="user"></app-footer>
  `,
})
export class ProductDetailPage implements OnInit, OnDestroy {
  categories = [];
  isGetProduct = false;
  user: { [key: string]: any } = {ecommerce: {social: {}, logo: '', cover: ''}, businessName: '', email: ''};
  projectId: any;

  constructor(
    public readonly productState: ProductState,
    private readonly cartState: CartState,
    private readonly activatedRoute: ActivatedRoute,
    private readonly route: Router,
    private readonly config: ConfigService,
    private readonly productService: ProductService,
    private readonly snack: MatSnackBar,
    private readonly userService: UserService) {
    this.projectId = this.config.shopDetails.value.projectId;
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
    this.productState.getTotalAvailableProducts();
    this.getProductDetail();
  }

  addToCart(): void {
    this.cartState.addToCart({
      quantity: 1,
      product: this.productState.selectedProduct.value,
    });
  }

  getProductDetail(): void {
    this.isGetProduct = true;
    this.activatedRoute.params.subscribe(value => {
      if (value && value.id) {
        this.productService.getProduct(value.id).then(product => {
          this.productState.selectedProduct.next(product);
        }).catch(_ => {
          this.snack.open('Fail to get product detail', 'Ok', {duration: 3000});
        }).finally(() => {
          this.isGetProduct = false;
        });
      } else {
        this.isGetProduct = false;
        this.route.navigateByUrl(`/shops/${this.config.shopDetails.value.projectId}/products`).catch(_ => {
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.productState.selectedProduct.next(null);
  }
}
