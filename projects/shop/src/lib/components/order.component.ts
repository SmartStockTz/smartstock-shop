import {Component, Input} from '@angular/core';
import {OrderModel} from '../models/order.model';
import moment from 'moment';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {OrderItemsSheetComponent} from './order-items-sheet.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-order',
  template: `
    <div class="product-container">
      <div class="product-head">
        <span class="name">#{{order.orderRef}}</span>
        <span class="pending-status">PENDING</span>
        <span style="flex: 1 1 auto"></span>
        <button (click)="payNow()" mat-button color="primary" class="view-shop">
          PAY NOW
        </button>
      </div>
      <hr class="line">
      <div class="category">
        <span>{{totalItems(order)}} items from {{totalShops(order)}} Shops  |   {{ago(order)}}</span>
      </div>
      <p class="price">
        Tsh {{order.total | number}}
      </p>
      <hr class="line">
      <div class="quantity-container">
        <button (click)="viewOrderItems()" color="primary" mat-button>
          View all items
        </button>
      </div>
    </div>
  `,
  styleUrls: ['../styles/order.style.scss']
})

export class OrderComponent {
  @Input() order: OrderModel;

  constructor(private readonly bottomSheet: MatBottomSheet,
              private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router) {
  }

  totalItems(order: OrderModel): number {
    return order.items.reduce((a, b) => a + b.quantity, 0);
  }

  totalShops(order: OrderModel): number {
    return order.items.reduce((a, b) => {
      if (b.shop && b.shop.projectId) {
        a.add(b.shop.projectId);
      }
      return a;
    }, new Set()).size;
  }

  ago(order: OrderModel): string {
    return moment(order.date).fromNow();
  }

  viewOrderItems(): void {
    this.bottomSheet.open(OrderItemsSheetComponent, {
      data: this.order,
      closeOnNavigation: true
    });
  }

  payNow(): void {
    this.router.navigate([`./${this.order.orderRef}/payment`], {relativeTo: this.activatedRoute})
      .catch(console.log);
  }
}
