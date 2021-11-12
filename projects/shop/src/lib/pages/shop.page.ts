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
      searchPlaceholder="Search product..."
      [showSearch]="true"
      (searchCallback)="searchProduct($event)"
      [showProgress]="(mallState.loadProducts | async) === true"
      [leftDrawerMode]="(deviceState.enoughWidth | async) === true?'side':'over'"
      [leftDrawerOpened]="(deviceState.enoughWidth | async) === true"
      [rightDrawer]="filter"
      [rightDrawerOpened]="(deviceState.enoughWidth | async) === true"
      [rightDrawerMode]="(deviceState.enoughWidth | async ) === true?'side':'over'"
      [cartIcon]="'filter_alt'"
      [leftDrawer]="side">
      <ng-template #filter>
<!--        <app-shop-filters-drawer></app-shop-filters-drawer>-->
        <app-cart-drawer></app-cart-drawer>
      </ng-template>
      <ng-template #side>
        <app-shop-drawer currentMenu="shop"></app-shop-drawer>
      </ng-template>
      <ng-template #body>
        <app-shop *ngIf="(mallState.loadShop | async)===false"></app-shop>
        <app-on-fetch [isLoading]="mallState.loadShop | async"
                      (refreshCallback)="reload()"
                      *ngIf="(mallState.shop | async ) === null || (mallState.loadShop | async)">
        </app-on-fetch>
        <app-pay-now view="cart"></app-pay-now>
      </ng-template>
    </app-layout-sidenav>
  `,
  styleUrls: []
})
export class ShopPage implements OnInit {
  constructor(public readonly deviceState: DeviceState,
              private readonly activatedRoute: ActivatedRoute,
              private readonly matSnackBar: MatSnackBar,
              public readonly mallState: MallState) {
  }

  ngOnInit(): void {
    this.reload();
  }

  searchProduct(query: string): void {
    this.mallState.searchProduct(query);
  }

  reload(): void {
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
