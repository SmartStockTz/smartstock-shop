import {Component, Input} from '@angular/core';
import {ProductModel} from '../models/product.model';

@Component({
  selector: 'app-product-card',
  template: `
    <div class="product-box">
      <figure>
        <img src="{{product.image}}" alt="">
      </figure>
      <div class="product-name">
        <h4><a href="#" title="">{{product.product}}</a></h4>
        <h2><a href="#" title="">{{product.retailPrice | currency: 'TZS '}}</a></h2>
        <button (click)="addToCart()" class="btn btn-outline-primary">
          Add To Cart
        </button>
      </div>
    </div>
  `
})

export class ProductCardComponent {
  constructor() {
  }

  @Input() product: ProductModel = {};

  addToCart(): void {
  }
}
