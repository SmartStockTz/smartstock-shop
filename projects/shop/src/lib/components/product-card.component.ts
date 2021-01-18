import {Component, Input} from '@angular/core';
import {ProductModel} from '../models/product.model';
import {CartState} from '../states/cart.state';
import {ConfigService} from '../services/config.service';

@Component({
  selector: 'app-product-card',
  template: `
    <mat-card style="margin-bottom: 5px; margin-top: 5px; cursor: pointer">
      <div routerLink="/shops/{{projectId}}/products/{{product.id}}" matRipple>
        <div matCardImage style="min-height: 300px" class="d-flex justify-content-center align-items-center">
          <div *ngIf="product.image; else elseBlock">
            <img src="{{ product.image.concat('/thumbnail?width=250&heigth=300') }}" alt="product image"/>
          </div>
          <ng-template #elseBlock>
            <img src="./assets/default.png" alt="product image"/>
          </ng-template>
        </div>
        <mat-card-content>
          <div class="product-name">
            <h4>
              <a title="">{{ product.product }}</a>
            </h4>
            <h2>
              <a title="">
                {{ product.retailPrice | number}} /
                {{ product.unit }}
              </a>
            </h2>
          </div>
        </mat-card-content>
      </div>
      <mat-card-actions>
        <button (click)="addToCart()" mat-stroked-button color="primary" style="width: 100%">
          <mat-icon>shopping_cart</mat-icon>
          Add To Cart
        </button>
      </mat-card-actions>
    </mat-card>
  `,
})
export class ProductCardComponent {
  constructor(private readonly cartState: CartState,
              private readonly config: ConfigService) {
    this.projectId = config.shopDetails.value.projectId;
  }

  @Input() product: ProductModel = {};
  projectId: any;

  addToCart(): void {
    this.cartState.addToCart({
      quantity: 1,
      product: this.product,
    });
  }
}
