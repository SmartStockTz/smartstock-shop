import {Component, Input} from '@angular/core';
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
         background: 'url('+product.image.concat('/thumbnail?width=400&heigth=300')+') #f5f5f5 center',
         borderRadius: '5px',
         backgroundSize: 'cover', height: '300px'
         }">
      </div>
      <mat-card-content>
        <div class="product-name">
          <h4>
            {{ product.product }}
          </h4>
          <p class="text-truncate">{{product.description}}</p>
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
export class ProductCardComponent {
  constructor(private readonly cartState: CartState,
              private readonly config: ConfigService) {
    this.projectId = config.shopDetails.value.projectId;
  }

  @Input() product: ProductModel = {};
  projectId: any;

  addToCart(e: any): void {
    this.cartState.addToCart({
      quantity: 1,
      product: this.product,
    });
  }
}
