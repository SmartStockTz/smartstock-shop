import {Component, OnDestroy, OnInit} from '@angular/core';
import {MallState} from '../states/mall.state';

@Component({
  selector: 'app-shop',
  template: `
    <div class="shop-container"
         infinite-scroll
         [scrollWindow]="false"
         [infiniteScrollDistance]="1"
         [infiniteScrollThrottle]="100"
         (scrolled)="onScroll()">
      <app-shop-header></app-shop-header>
      <app-shop-tabs></app-shop-tabs>
      <app-shop-products></app-shop-products>
      <div style="display: flex; justify-content: center; align-items: center">
        <button (click)="onScroll()"
                mat-button color="primary" *ngIf="(mallState.loadMoreProducts  |async) === false">
          Load More
        </button>
        <mat-progress-spinner *ngIf="(mallState.loadMoreProducts  | async) === true"
                              [diameter]="20"
                              color="primary"
                              mode="indeterminate">
        </mat-progress-spinner>
      </div>
      <app-pay-now></app-pay-now>
    </div>
  `,
  styleUrls: ['../styles/shop.style.scss']
})

export class ShopComponent implements OnInit, OnDestroy {
  constructor(public readonly mallState: MallState) {
  }

  ngOnInit(): void {
  }

  onScroll(): void {
    this.mallState.fetchMoreProducts(20);
  }

  ngOnDestroy(): void {
    this.mallState.products.next([]);
  }
}
