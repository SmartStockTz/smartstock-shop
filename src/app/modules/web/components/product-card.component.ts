import {Component, Input} from '@angular/core';
import {ProductModel} from '../models/product.model';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-product-card',
  template: `
    <div class="product-box">
      <figure>
        <img src="{{product.image}}" alt="">
      </figure>
      <div class="product-name">
        <h5><a href="#" title="">{{product.product}}</a></h5>
        <h5><a href="#" title="">{{product.retailPrice | currency: 'TZS '}}</a></h5>
        <button (click)="addToCart()" class="">
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
