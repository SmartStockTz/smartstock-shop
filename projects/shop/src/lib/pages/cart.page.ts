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
      heading="Cart"
      [showSearch]="false"
      [leftDrawer]="side"
      [leftDrawerMode]="(deviceState.enoughWidth | async) === true?'side':'over'"
      [leftDrawerOpened]="(deviceState.enoughWidth | async) === true"
      [rightDrawer]="filter"
      [rightDrawerOpened]="(deviceState.enoughWidth | async) === true"
      [rightDrawerMode]="(deviceState.enoughWidth | async ) === true?'side':'over'"
      [cartIcon]="'dehaze'">
      <ng-template #filter>
        <app-cart-drawer></app-cart-drawer>
      </ng-template>
      <ng-template #side>
        <app-shop-drawer currentMenu="cart"></app-shop-drawer>
      </ng-template>
      <ng-template #body>
        <app-cart></app-cart>
      </ng-template>
    </app-layout-sidenav>
  `,
  styleUrls: []
})
export class CartPage implements OnInit{
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
