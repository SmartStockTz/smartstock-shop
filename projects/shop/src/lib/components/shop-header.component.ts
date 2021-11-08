import {Component, OnInit} from '@angular/core';
import {MallState} from '../states/mall.state';

@Component({
  selector: 'app-shop-header',
  template: `
    <div class="shop-header-container">
      <img src="{{mallState.shop.value?.shop?.ecommerce?.logo}}"
           *ngIf="showLogo" class="shop-logo" alt="shopLogo"
           (error)="hideLogo()">
      <div class="shop-details">
        <p class="shop-details-head">{{(mallState.shop | async)?.shop?.businessName}}</p>
        <p class="shop-details-total-products">{{mallState.totalProducts | async | number}} Products</p>
        <p class="shop-details-category">
          {{mallState.shop.value?.shop?.country}} | {{mallState.shop.value?.shop?.region}}
        </p>
      </div>
    </div>
  `,
  styleUrls: ['../styles/shop-header.style.scss']
})

export class ShopHeaderComponent implements OnInit {
  showLogo = true;

  constructor(public readonly mallState: MallState) {
  }

  hideLogo(): void {
    this.showLogo = false;
  }

  ngOnInit(): void {
    this.mallState.getTotalProducts();
  }
}
