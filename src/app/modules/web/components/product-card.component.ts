import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from '../models/product.model';
import {CartState} from '../states/cart.state';

@Component({
  selector: 'app-product-card',
  template: `
    <mat-card style="margin-bottom: 5px; margin-top: 5px; cursor: pointer">
      <div matCardImage style="min-height: 300px" class="d-flex justify-content-center align-items-center">
        <div *ngIf="product && product.images; else elseBlock">
          <img src="{{ product.images[0] }}" alt="product image"/>
        </div>
        <ng-template #elseBlock>
          <img src="../../../../assets/default.png" alt="product image"/>
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
      <mat-card-actions>
        <button (click)="addToCart()" mat-flat-button color="primary" style="width: 100%">
          <mat-icon>shopping_cart</mat-icon>
          Add To Cart
        </button>
      </mat-card-actions>
    </mat-card>
  `,
})
export class ProductCardComponent implements OnInit{
  constructor(private readonly cartState: CartState) {
  }
  ngOnInit(): void {
    // console.log(this.product);
  }

  @Input() product: ProductModel = {};

  addToCart(): void {
    this.cartState.addToCart({
      quantity: 1,
      product: this.product,
    });
  }
}
