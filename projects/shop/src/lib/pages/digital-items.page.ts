import { Component, OnDestroy, OnInit } from "@angular/core";
import { DeviceState, MenuModel } from "smartstock-core";
import { CartState } from "../states/cart.state";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { MallState } from "../states/mall.state";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-digital-items-page",
  template: `
    <app-layout-sidenav
      [body]="body"
      heading="Digital Items"
      [showSearch]="false"
      [leftDrawer]="side"
      [leftDrawerMode]="
        (deviceState.enoughWidth | async) === true ? 'side' : 'over'
      "
      [leftDrawerOpened]="(deviceState.enoughWidth | async) === true"
      [rightDrawer]="filter"
      [showBottomBar]="false"
      [showModuleMenu]="true"
      [rightDrawerOpened]="(deviceState.enoughWidth | async) === true"
      [rightDrawerMode]="
        (deviceState.enoughWidth | async) === true ? 'side' : 'over'
      "
      [cartIcon]="'info_outline'"
    >
      <ng-template #filter>
        <app-cart-drawer></app-cart-drawer>
      </ng-template>
      <ng-template #side>
        <app-shop-drawer currentMenu="digital"></app-shop-drawer>
      </ng-template>
      <ng-template #body>
        <app-pay-now [view]="'cart'"></app-pay-now>
      </ng-template>
    </app-layout-sidenav>
  `,
  styleUrls: []
})
export class DigitalItemsPage implements OnInit, OnDestroy {
  destroyer = new Subject();
  menus: MenuModel[] = [];

  constructor(
    public readonly deviceState: DeviceState,
    private readonly cartState: CartState,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly mallState: MallState,
    private readonly matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(value => {
    //   if (value && value.id) {
    //     this.mallState.getShop(value.id);
    //   } else {
    //     this.matSnackBar.open('Fail to identify current shop', 'Ok', {
    //       duration: 2000
    //     });
    //   }
    // });
  }

  ngOnDestroy(): void {
    this.destroyer.next("done");
  }
}
