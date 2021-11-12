import {Component, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import {OrderModel} from '../models/order.model';

@Component({
  selector: 'app-order-items-sheet',
  template: `
    <div class="items-sheet-container">
      <div class="bar-container">
        <div class="bar"></div>
      </div>
      <div class="body">
        <app-cart-item [viewOnly]="true"  [cart]="cart" *ngFor="let cart of data.items"></app-cart-item>
      </div>
    </div>
  `,
  styleUrls: ['../styles/items-sheet.style.scss']
})
export class OrderItemsSheetComponent {
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public readonly data: OrderModel) {
  }
}
