import { Component, Input, OnInit } from "@angular/core";
import { UserService } from "smartstock-core";
import { MallState } from "../states/mall.state";
import { CartState } from "../states/cart.state";

@Component({
  selector: "app-shop-drawer",
  template: `
    <div class="drawer">
      <mat-toolbar class="brand">
        <button [routerLink]="'/'" mat-icon-button color="primary">
          <mat-icon>arrow_back_ios</mat-icon>
        </button>
        <!--        <img class="logo" src="assets/img/sslogo.png">-->
        <span class="logo-text">Shop</span>
      </mat-toolbar>
      <p class="menu-title">Menu</p>
      <button
        routerLink="/shops/{{ mallState.shop.value?.shop?.projectId }}"
        mat-button
        [class]="currentMenu === 'shop' ? 'menu-selected' : 'menu-not-selected'"
      >
        <mat-icon color="primary">view_compact</mat-icon>
        <span class="menu-text">Products</span>
      </button>
      <button
        routerLink="/shops/default/cart"
        mat-button
        [class]="currentMenu === 'cart' ? 'menu-selected' : 'menu-not-selected'"
      >
        <mat-icon color="primary">shopping_cart</mat-icon>
        <span class="menu-text"
          >Cart ( {{ cartState.totalCarts | async }} )</span
        >
      </button>
      <button
        routerLink="/shops/default/orders"
        mat-button
        [class]="
          currentMenu === 'orders' ? 'menu-selected' : 'menu-not-selected'
        "
      >
        <mat-icon color="primary">receipt</mat-icon>
        <span class="menu-text">Orders</span>
      </button>
      <!--      <button routerLink="/shops/default/items" mat-button-->
      <!--              [class]="currentMenu==='digital'?'menu-selected':'menu-not-selected'">-->
      <!--        <mat-icon color="primary">favorite</mat-icon>-->
      <!--        <span class="menu-text">My Items</span>-->
      <!--      </button>-->
      <!--      <a *ngIf="logIn" href="/account/profile" target="_blank" mat-button-->
      <!--         [class]="currentMenu==='profile'?'menu-selected':'menu-not-selected'">-->
      <!--        <mat-icon color="primary">person</mat-icon>-->
      <!--        <span class="menu-text">Profile</span>-->
      <!--      </a>-->
    </div>
  `,
  styleUrls: ["../styles/shop-drawer.style.scss"]
})
export class ShopDrawerComponent implements OnInit {
  logIn = false;
  @Input() currentMenu = "";

  constructor(
    private readonly userService: UserService,
    public readonly cartState: CartState,
    public readonly mallState: MallState
  ) {}

  ngOnInit(): void {
    this.cartState.fetchCarts();
    this.userService.currentUser().then((value) => {
      setTimeout(() => {
        this.logIn = !!(value && value.id);
      }, 100);
    });
  }
}
