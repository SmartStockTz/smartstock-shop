import {NgModule} from '@angular/core';
import {Route, RouterModule, ROUTES} from '@angular/router';
import {LandingPageComponent} from './pages/landing.page';
import {ProductsPageComponent} from './pages/products.page';
import {NavbarComponent} from './components/navbar.component';
import {FooterComponent} from './components/footer.component';
import {ProductCardComponent} from './components/product-card.component';
import {ProductsListComponent} from './components/products-list.component';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {CartPreviewComponent} from './components/cart-preview.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {CheckoutComponent} from './components/checkout.component';
import {CheckoutPage} from './pages/checkout.page';
import {MatTableModule} from '@angular/material/table';
import {MatRippleModule} from '@angular/material/core';
import {LoginDialogComponent} from './components/login-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {OrdersPage} from './pages/orders.page';
import {MyOrdersComponent} from './components/my-orders.component';
import {AuthenticationGuard} from './guards/authentication.guard';
import {MatPaginatorModule} from '@angular/material/paginator';
import {CdkTableModule} from '@angular/cdk/table';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetModule, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {OrdersTableOptionsComponent} from './components/orders-table-options.component';
import {OrdersTableShowItemsComponent} from './components/orders-table-show-items.component';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {CategoryListComponent} from './components/category-list.component';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {SearchComponent} from './components/search.component';
import {ProductsByCategoriesListComponent} from './components/products-by-categories-list.component';
import {HeaderComponent} from './components/header.component';
import {ProductsCategoryComponent} from './components/products-by-category.component';
import {BFast} from 'bfastjs';
import {ConfigService} from './services/config.service';
import {FirebaseAuthService} from './services/firebase-auth.service';
import {ProductDetailPage} from './pages/product-detail.page';

const routes: Route[] = [
  {path: '', component: LandingPageComponent},
  {path: 'orders', canActivate: [AuthenticationGuard], component: OrdersPage},
  {path: 'products', component: ProductsPageComponent},
  {path: 'products/:id', component: ProductDetailPage},
  {path: 'checkout', component: CheckoutPage},
];

@NgModule({
  declarations: [
    ProductDetailPage,
    ProductsByCategoriesListComponent,
    SearchComponent,
    HeaderComponent,
    CategoryListComponent,
    ProductsCategoryComponent,
    LandingPageComponent,
    ProductsPageComponent,
    NavbarComponent,
    FooterComponent,
    ProductCardComponent,
    ProductsListComponent,
    CartPreviewComponent,
    CheckoutComponent,
    CheckoutPage,
    LoginDialogComponent,
    OrdersPage,
    MyOrdersComponent,
    OrdersTableOptionsComponent,
    OrdersTableShowItemsComponent,
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
    MatAutocompleteModule
  ],
  providers: [
    {provide: MatBottomSheetRef, useValue: {}},
    {provide: MAT_BOTTOM_SHEET_DATA, useValue: {}},
  ],
})
export class ShopCoreModule {
  constructor(private readonly config: ConfigService) {
    BFast.init({
      applicationId: config.shopDetails.value.applicationId,
      projectId: config.shopDetails.value.projectId,
      appPassword: config.shopDetails.value.masterKey,
      adapters: {
        auth: () => new FirebaseAuthService(),
      },
    });
  }
}
