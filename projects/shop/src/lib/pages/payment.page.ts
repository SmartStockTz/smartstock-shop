import {Component, OnDestroy, OnInit} from '@angular/core';
import {DeviceState, MenuModel} from '@smartstocktz/core-libs';
import {ActivatedRoute} from '@angular/router';
import {MallState} from '../states/mall.state';
import {MatSnackBar} from '@angular/material/snack-bar';
import {OrderState} from '../states/order.state';

@Component({
  selector: 'app-payment-page',
  template: `
    <app-layout-sidenav
      [body]="body"
      heading="Payments"
      [showSearch]="false"
      [leftDrawerMode]="(deviceState.enoughWidth | async) === true?'side':'over'"
      [leftDrawer]="side"
      [leftDrawerOpened]="(deviceState.enoughWidth | async) === true"
      [rightDrawer]="filter"
      [rightDrawerOpened]="(deviceState.enoughWidth | async) === true"
      [rightDrawerMode]="(deviceState.enoughWidth | async ) === true?'side':'over'"
      [showBottomBar]="false"
      [showModuleMenu]="true"
      [cartIcon]="'info_outline'">
      <ng-template #filter>
        <app-cart-drawer></app-cart-drawer>
      </ng-template>
      <ng-template #side>
        <app-shop-drawer currentMenu="orders"></app-shop-drawer>
      </ng-template>
      <ng-template #body>
        <app-payment></app-payment>
      </ng-template>
    </app-layout-sidenav>
  `,
  styleUrls: []
})

export class PaymentPage implements OnInit, OnDestroy {
  menus: MenuModel[];

  constructor(public readonly deviceState: DeviceState,
              private readonly activatedRoute: ActivatedRoute,
              private readonly mallState: MallState,
              private readonly orderState: OrderState,
              private readonly matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.menus = [
      {
        name: 'Mall',
        icon: 'home',
        link: '/',
        pages: [],
        roles: ['*']
      },
      {
        name: 'Cart',
        icon: 'shopping_cart',
        link: './cart',
        pages: [],
        roles: ['*']
      },
      {
        name: 'Orders',
        icon: 'favorite',
        link: './orders',
        pages: [],
        roles: ['*']
      }
    ];
    this.activatedRoute.params.subscribe(value => {
      if (value && value.id) {
        this.mallState.getShop(value.id);
      } else {
        this.matSnackBar.open('Fail to identify current shop', 'Ok', {
          duration: 2000
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.orderState.order.next(undefined);
  }
}
