import {Component, OnDestroy, OnInit} from '@angular/core';
import {DeviceState, MenuModel} from '@smartstocktz/core-libs';
import {ActivatedRoute} from '@angular/router';
import {MallState} from '../states/mall.state';
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
              private readonly orderState: OrderState) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.orderState.order.next(undefined);
  }
}
