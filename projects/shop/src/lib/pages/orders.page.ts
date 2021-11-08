import {Component} from '@angular/core';
import {DeviceState} from '@smartstocktz/core-libs';
import {MallState} from '../states/mall.state';

@Component({
  selector: 'app-shop-page',
  template: `
    <app-layout-sidenav
      [body]="body"
      heading="Orders"
      [showSearch]="false"
      [leftDrawerMode]="(deviceState.enoughWidth | async) === true?'side':'over'"
      [leftDrawer]="side"
      [leftDrawerOpened]="(deviceState.enoughWidth | async) === true">
<!--      <ng-template #filter>-->
<!--        <app-shop-filters-drawer></app-shop-filters-drawer>-->
<!--      </ng-template>-->
      <ng-template #side>
        <app-shop-drawer currentMenu="orders"></app-shop-drawer>
      </ng-template>
      <ng-template #body>

      </ng-template>
    </app-layout-sidenav>
  `,
  styleUrls: []
})
export class OrdersPage {
  constructor(public readonly deviceState: DeviceState) {
  }
}
