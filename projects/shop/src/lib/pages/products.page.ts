import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from '../services/user.service';
import {ProductState} from '../states/product.state';

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
              <div class="shop-filter-sec">
                <span>Showing {{ productState.products.value.length }} of {{ productState.totalProducts | async }} results </span>
              </div>
              <ssm-products-by-category></ssm-products-by-category>
            </div>
          </div>
        </div>
      </div>
      <app-cart-preview></app-cart-preview>
    </section>
    <app-footer [user]="user"></app-footer>
  `,
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  // products: ProductModel[] = [];
  // changes = BFast.database().table('stocks').query().changes();
  // totalProducts = 0;
  categories = [];

  user: { [key: string]: any } = {ecommerce: {social: {}, logo: '', cover: ''}, businessName: '', email: ''};

  constructor(
    public readonly productState: ProductState,
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
    this.productState.getTotalAvailableProducts();
    // this.productService
    //   .getProducts()
    //   .then((value) => {
    //     this.products = value;
    //   })
    //   .catch((reason) => {
    //     console.log(reason);
    //   });
    // this.changes.addListener((response) => {
    //   if (response.body.change && response.body.change.name === 'create') {
    //     this.products.push(response.body.change.snapshot);
    //   }
    // });

    // this.productService.getCategories().then((val) => {
    //   val.forEach((value: CategoryModel) => {
    //     this.categories.push(value.name);
    //   });
    // });
  }

  ngOnDestroy(): void {
    // this.changes.close();
  }

  // loadMoreProducts(): void {
  //   this.isLoadMore = true;
  //   this.productService
  //     .getProducts({
  //       size: 20,
  //       skip: this.products.length,
  //     })
  //     .then((value) => {
  //       if (value && value.length === 0) {
  //         this.snack.open('No More Products', 'Ok', {
  //           duration: 2000,
  //         });
  //       } else if (value && value.length > 0) {
  //         this.products.push(...value);
  //       }
  //     })
  //     .catch((reason) => {
  //       console.log(reason);
  //     })
  //     .finally(() => {
  //       this.isLoadMore = false;
  //     });
  // }
}
