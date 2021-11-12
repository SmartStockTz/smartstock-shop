import {Component, OnDestroy, OnInit} from '@angular/core';
import {DeviceState} from '@smartstocktz/core-libs';
import {CartState} from '../states/cart.state';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject, takeUntil} from 'rxjs';

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
      [cartIcon]="'dehaze'">
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
              private readonly router: Router) {
  }

  ngOnInit(): void {
    this.cartState.carts.pipe(takeUntil(this.destroyer)).subscribe(value => {
      if (value.length === 0) {
        this.router.navigate(['../'], {relativeTo: this.route}).catch(console.log);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyer.next('done');
  }
}
