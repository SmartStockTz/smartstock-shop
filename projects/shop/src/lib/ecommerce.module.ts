import { NgModule } from "@angular/core";
import { Route, RouterModule, ROUTES } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatRippleModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatMenuModule } from "@angular/material/menu";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { CdkTableModule } from "@angular/cdk/table";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatSelectModule } from "@angular/material/select";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { init } from "bfast";
import { ShopPage } from "./pages/shop.page";
import { ShopDrawerComponent } from "./components/shop-drawer.component";
import { getDaasAddress, getFaasAddress, LibModule } from "smartstock-core";
import { MallState } from "./states/mall.state";
import { ShopComponent } from "./components/shop.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { FilterDrawerComponent } from "./components/filter-drawer.component";
import { OrdersPage } from "./pages/orders.page";
import { CartPage } from "./pages/cart.page";
import { ShopHeaderComponent } from "./components/shop-header.component";
import { ShopTabsComponent } from "./components/shop-tabs.component";
import { MatTabsModule } from "@angular/material/tabs";
import { ShopProductsComponent } from "./components/shop-products.component";
import { ProductComponent } from "./components/product.component";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { CartComponent } from "./components/cart.component";
import { CartItemComponent } from "./components/cart-item.component";
import { CartDrawerComponent } from "./components/cart-drawer.component";
import { PayNowComponent } from "./components/pay-now.component";
import { CheckoutPage } from "./pages/checkout.page";
import { CheckoutComponent } from "./components/checkout.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRadioModule } from "@angular/material/radio";
import { OrdersComponent } from "./components/orders.component";
import { OrderComponent } from "./components/order.component";
import { OrderItemsSheetComponent } from "./components/order-items-sheet.component";
import { PaymentPage } from "./pages/payment.page";
import { PaymentComponent } from "./components/payment.component";
import { PaymentHeaderComponent } from "./components/payment-header.component";
import { PaymentModesComponent } from "./components/payment-modes.component";
import { PaymentModesMobileComponent } from "./components/payment-modes-mobile.component";
import { AuthenticationGuard } from "./guards/authentication.guard";
import { DigitalItemsPage } from "./pages/digital-items.page";

const routes: Route[] = [
  { path: "", canActivate: [], component: ShopPage },
  { path: "cart", canActivate: [AuthenticationGuard], component: CartPage },
  {
    path: "checkout",
    canActivate: [AuthenticationGuard],
    component: CheckoutPage
  },
  { path: "orders", canActivate: [AuthenticationGuard], component: OrdersPage },
  {
    path: "items",
    canActivate: [AuthenticationGuard],
    component: DigitalItemsPage
  },
  {
    path: "orders/:orderid/payment",
    canActivate: [AuthenticationGuard],
    component: PaymentPage
  }
];

@NgModule({
  declarations: [
    PaymentPage,
    DigitalItemsPage,
    PaymentComponent,
    PaymentHeaderComponent,
    PaymentModesComponent,
    ShopPage,
    CheckoutComponent,
    OrdersComponent,
    ShopDrawerComponent,
    ShopComponent,
    FilterDrawerComponent,
    OrdersPage,
    CartPage,
    ShopHeaderComponent,
    ShopTabsComponent,
    ShopProductsComponent,
    ProductComponent,
    CartComponent,
    CartItemComponent,
    CartDrawerComponent,
    PayNowComponent,
    CheckoutPage,
    OrderComponent,
    OrderItemsSheetComponent,
    PaymentModesMobileComponent
  ],
  imports: [
    MatSelectModule,
    MatIconModule,
    {
      ngModule: RouterModule,
      providers: [
        {
          useValue: routes,
          provide: ROUTES
        }
      ]
    },
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatRippleModule,
    MatDialogModule,
    MatMenuModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatPaginatorModule,
    CdkTableModule,
    MatBottomSheetModule,
    MatListModule,
    MatCardModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatAutocompleteModule,
    LibModule,
    MatToolbarModule,
    MatTabsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  providers: []
})
export class EcommerceModule {
  constructor(private readonly mallState: MallState) {
    init(
      {
        applicationId: mallState.shop.value.shop.applicationId,
        projectId: mallState.shop.value.shop.projectId,
        // @ts-ignore
        databaseURL: getDaasAddress(mallState.shop.value.shop),
        // @ts-ignore
        functionsURL: getFaasAddress(mallState.shop.value.shop),
        adapters: {
          http: "DEFAULT",
          auth: "DEFAULT",
          cache: "DEFAULT"
        }
      },
      mallState.shop.value.shop.projectId
    );
  }
}
