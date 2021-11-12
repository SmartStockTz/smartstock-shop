import {Component, OnInit} from '@angular/core';
import {DeviceState} from '@smartstocktz/core-libs';
import {MallState} from '../states/mall.state';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

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
        <app-pay-now view="cart"></app-pay-now>
      </ng-template>
    </app-layout-sidenav>
  `,
  styleUrls: []
})
export class OrdersPage implements OnInit{
  constructor(public readonly deviceState: DeviceState,
              private readonly activatedRoute: ActivatedRoute,
              private readonly matSnackBar: MatSnackBar,
              public readonly mallState: MallState) {
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
}
