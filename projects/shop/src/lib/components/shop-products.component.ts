import {Component, OnInit} from '@angular/core';
import {MallState} from '../states/mall.state';

@Component({
  selector: 'app-shop-products',
  template: `
    <app-on-fetch *ngIf="(mallState.products.value.length === 0 || mallState.loadProducts.value) && mallState.loadMoreProducts.value === false"
                  (refreshCallback)="loadProducts()"
                  [isLoading]="mallState.loadProducts | async">
    </app-on-fetch>
    <app-product [product]="product" *ngFor="let product of mallState.products | async"></app-product>
  `,
  styleUrls: []
})

export class ShopProductsComponent implements OnInit {
  constructor(public readonly mallState: MallState) {
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.mallState.fetchProducts(20, 0);
  }
}
