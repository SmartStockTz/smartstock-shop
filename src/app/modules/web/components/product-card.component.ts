import {Component, Input} from '@angular/core';
import {ProductModel} from '../models/product.model';
import {CartState} from '../states/cart.state';

@Component({
  selector: 'app-product-card',
  template: `
    <div class="product-box">
      <figure>
        <img src="{{product.image}}" alt="">
      </figure>
      <div class="product-name">
        <h4><a title="">{{product.product}}</a></h4>
        <h2><a  title="">{{product.retailPrice | currency: 'TZS '}} / {{product.unit}}</a></h2>
        <button (click)="addToCart()" class="btn btn-outline-primary">
          Add To Cart
        </button>
      </div>
    </div>
  `
})

export class ProductCardComponent {
  constructor(private readonly cartState: CartState) {
  }

  @Input() product: ProductModel = {};

  addToCart(): void {
    this.cartState.addToCart({
      quantity: 1, product: this.product
    });
  }
}
