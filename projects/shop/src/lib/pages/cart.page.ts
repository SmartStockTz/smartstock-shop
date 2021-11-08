import {Component} from '@angular/core';
import {DeviceState} from '@smartstocktz/core-libs';
import {MallState} from '../states/mall.state';

@Component({
  selector: 'app-shop-page',
  template: `
    <app-layout-sidenav
      [body]="body"
      heading="Cart"
      [showSearch]="false"
      [leftDrawer]="side"
      [leftDrawerMode]="(deviceState.enoughWidth | async) === true?'side':'over'"
      [leftDrawerOpened]="(deviceState.enoughWidth | async) === true">
<!--      <ng-template #filter>-->
<!--        <app-shop-filters-drawer></app-shop-filters-drawer>-->
<!--      </ng-template>-->
      <ng-template #side>
        <app-shop-drawer currentMenu="cart"></app-shop-drawer>
      </ng-template>
      <ng-template #body>

      </ng-template>
    </app-layout-sidenav>
  `,
  styleUrls: []
})
export class CartPage {
  constructor(public readonly deviceState: DeviceState) {
  }
}
