import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProductModel} from '../models/product.model';
import {CartState} from '../states/cart.state';
import {ConfigService} from '../services/config.service';

@Component({
  selector: 'app-product-card',
  template: `
    <div style="margin-bottom: 5px; margin-top: 5px; cursor: pointer"
         routerLink="/shops/{{projectId}}/products/{{product.id}}" matRipple>
      <div
        [ngStyle]="{
         background: 'url('+productImage+') #f5f5f5 center',
         borderRadius: '5px',
         backgroundSize: 'cover', height: '300px'
         }">
      </div>
      <mat-card-content>
        <div class="product-name">
          <h4>
            {{ product.product }}
          </h4>
          <!--          <p class="text-truncate">{{product.description}}</p>-->
          <h2>
            Tsh {{ product.retailPrice | number}}
          </h2>
        </div>
      </mat-card-content>
    </div>
    <mat-card-actions>
      <button (click)="addToCart($event)" mat-stroked-button color="primary" style="width: 100%">
        <mat-icon>shopping_cart</mat-icon>
        Add To Cart
      </button>
    </mat-card-actions>
  `,
})
export class ProductCardComponent implements OnInit, OnDestroy {
  constructor(private readonly cartState: CartState,
              private readonly config: ConfigService) {
    this.projectId = config.shopDetails.value.projectId;
  }

  @Input() product: ProductModel = {};
  projectId: any;
  productImage: string;

  async addToCart(e: any): Promise<void> {
    this.cartState.addToCart({
      quantity: 1,
      product: this.product,
    });
  }

  async ngOnDestroy(): Promise<void> {
  }

  async ngOnInit(): Promise<void> {
    if (this.product && this.product.image) {
      this.productImage = this.product.image.concat('/thumbnail?width=400&height=300');
    } else {
      this.productImage = 'https://via.placeholder.com/400';
    }
  }
}
