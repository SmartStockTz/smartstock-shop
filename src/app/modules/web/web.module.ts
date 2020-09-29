import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
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


const routes: Route[] = [
  {path: '', component: LandingPageComponent},
  {path: 'products', component: ProductsPageComponent},
  {path: 'checkout', component: CheckoutPage},
];

@NgModule({
  declarations: [
    LandingPageComponent,
    ProductsPageComponent,
    NavbarComponent,
    FooterComponent,
    ProductCardComponent,
    ProductsListComponent,
    CartPreviewComponent,
    CheckoutComponent,
    CheckoutPage,
    LoginDialogComponent
  ],
  imports: [
    RouterModule.forChild(routes),
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
    FormsModule
  ]
})

export class WebModule {

}
