import {Component, OnDestroy, OnInit} from '@angular/core';
import {DeviceState} from '@smartstocktz/core-libs';
import {CartState} from '../states/cart.state';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject, takeUntil} from 'rxjs';
import {MallState} from '../states/mall.state';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-checkout-page',
  template: `
    <app-layout-sidenav
      [body]="body"
      heading="Checkout"
      [showSearch]="false"
      [leftDrawer]="side"
      [leftDrawerMode]="(deviceState.enoughWidth | async) === true?'side':'over'"
      [leftDrawerOpened]="(deviceState.enoughWidth | async) === true"
      [rightDrawer]="filter"
      [rightDrawerOpened]="(deviceState.enoughWidth | async) === true"
      [rightDrawerMode]="(deviceState.enoughWidth | async ) === true?'side':'over'"
      [cartIcon]="'info_outline'">
      <ng-template #filter>
        <app-cart-drawer></app-cart-drawer>
      </ng-template>
      <ng-template #side>
        <app-shop-drawer currentMenu="cart"></app-shop-drawer>
      </ng-template>
      <ng-template #body>
        <app-checkout></app-checkout>
      </ng-template>
    </app-layout-sidenav>
  `,
  styleUrls: []
})
export class CheckoutPage implements OnInit, OnDestroy {
  destroyer = new Subject();

  constructor(public readonly deviceState: DeviceState,
              private readonly cartState: CartState,
              private readonly route: ActivatedRoute,
              private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute,
              private readonly mallState: MallState,
              private readonly matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.cartState.carts.pipe(takeUntil(this.destroyer)).subscribe(value => {
      if (value.length === 0) {
        this.router.navigate(['../'], {relativeTo: this.route}).catch(console.log);
      }
    });
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
    this.destroyer.next('done');
  }
}
