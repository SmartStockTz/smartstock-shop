import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '@smartstocktz/core-libs';
import {MallState} from '../states/mall.state';

@Component({
  selector: 'app-shop-drawer',
  template: `
    <div class="drawer">
      <mat-toolbar class="brand">
        <button [routerLink]="'/'" mat-icon-button color="primary">
          <mat-icon>arrow_back_ios</mat-icon>
        </button>
        <img class="logo" src="assets/img/sslogo.png">
<!--        <span class="logo-text"></span>-->
      </mat-toolbar>
      <p class="menu-title">Menu</p>
      <button routerLink="/shops/{{mallState.shop.value?.shop?.projectId}}" mat-button
              [class]="currentMenu==='shop'?'menu-selected':'menu-not-selected'">
        <mat-icon color="primary">view_compact</mat-icon>
        <span class="menu-text">Products</span>
      </button>
      <button routerLink="/shops/{{mallState.shop.value?.shop?.projectId}}/cart" mat-button
              [class]="currentMenu==='cart'?'menu-selected':'menu-not-selected'">
        <mat-icon color="primary">shopping_cart</mat-icon>
        <span class="menu-text">Cart ( {{totalCartItems}} )</span>
      </button>
      <button routerLink="/shops/{{mallState.shop.value?.shop?.projectId}}/orders" mat-button
              [class]="currentMenu==='orders'?'menu-selected':'menu-not-selected'">
        <mat-icon color="primary">favorite</mat-icon>
        <span class="menu-text">Orders</span>
      </button>
      <a *ngIf="logIn" href="/account/profile" target="_blank" mat-button
              [class]="currentMenu==='profile'?'menu-selected':'menu-not-selected'">
        <mat-icon color="primary">person</mat-icon>
        <span class="menu-text">Profile</span>
      </a>
    </div>
  `,
  styleUrls: ['../styles/shop-drawer.style.scss']
})

export class ShopDrawerComponent implements OnInit {
  logIn = false;
  @Input() currentMenu = '';
  totalCartItems = 0;

  constructor(private readonly userService: UserService,
              public readonly mallState: MallState) {
  }

  ngOnInit(): void {
    this.userService.currentUser().then(value => {
      setTimeout(() => {
        this.logIn = !!(value && value.id);
      }, 100);
    });
  }
}
