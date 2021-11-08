import {Component, OnInit} from '@angular/core';
import {UserService} from '@smartstocktz/core-libs';
import {CartState} from '../states/cart.state';
import {MallState} from '../states/mall.state';

@Component({
  selector: 'app-cart-drawer',
  template: `
    <div class="filter-drawer">
      <mat-toolbar class="filter-container">
        <span style="flex: 1 1 auto"></span>
        <button *ngIf="!isLogIn" routerLink="/account/login" mat-button color="primary" class="button">Login</button>
        <button *ngIf="!isLogIn" routerLink="/account/register" mat-button color="primary" class="button">Register
        </button>
      </mat-toolbar>
      <p class="title">Checkout</p>
      <div class="cost-container">
        <p class="cost-title">Products Cost</p>
        <p class="cost-text">Tsh {{cartState.totalCost  | async | number}}</p>
<!--        <p class="cost-title">Processing Cost</p>-->
<!--        <p class="cost-text">Tsh {{cartState.serviceCharge | async}}</p>-->
      </div>
    </div>
  `,
  styleUrls: ['../styles/filter-drawer.style.scss', '../styles/cart-drawer.style.scss']
})

export class CartDrawerComponent implements OnInit {
  isLogIn = true;
  currency = 'Tsh';

  constructor(private readonly userService: UserService,
              public readonly mallState: MallState,
              public readonly cartState: CartState) {
  }

  ngOnInit(): void {
    this.currency = this.mallState.shop.value?.shop?.settings?.currency
      ? this.mallState.shop.value.shop.settings.currency : 'Tsh';
    this.userService.currentUser().then(value => {
      this.isLogIn = value && value.id;
    });
  }
}
