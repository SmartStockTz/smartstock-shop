import {Component, Input} from '@angular/core';
import {ProductModel} from '../models/product.model';
import {CartState} from '../states/cart.state';
import {ConfigService} from '../services/config.service';

@Component({
  selector: 'app-product-card',
  template: `
    <div style="margin-bottom: 5px; margin-top: 5px; cursor: pointer">
      <div routerLink="/shops/{{projectId}}/products/{{product.id}}" matRipple>
        <div class="d-flex justify-content-center align-items-center product-image">
          <div *ngIf="product.image; else elseBlock">
            <img src="{{ product.image.concat('/thumbnail?width=300&height=250') }}" alt="product image"/>
          </div>
          <ng-template #elseBlock>
            <img src="./assets/default.png" style="width: 300px; height: 250px" alt="product image"/>
          </ng-template>
        </div>
        <mat-card-content>
          <div class="product-name">
            <h4 class="text-truncate">{{ product.product }}</h4>
            <h2>
              <a title="">
                {{ product.retailPrice | number}} /{{ product.unit }}
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
    </div>
  `,
  styleUrls: ['../styles/product.style.scss']
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
