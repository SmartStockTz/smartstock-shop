import {Component, OnDestroy, OnInit} from '@angular/core';
import {DeviceState} from '@smartstocktz/core-libs';
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
  constructor(public readonly deviceState: DeviceState,
              private readonly activatedRoute: ActivatedRoute,
              private readonly mallState: MallState,
              private readonly orderState: OrderState,
              private readonly matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
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
