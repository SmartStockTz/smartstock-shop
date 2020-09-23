import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {LandingPageComponent} from './pages/landing.page';
import {ProductsPageComponent} from './pages/products.page';
import {NavbarComponent} from './components/navbar.component';
import {FooterComponent} from './components/footer.component';
import {ProductCardComponent} from './components/product-card.component';
import {ProductsListComponent} from './components/products-list.component';
import {CommonModule} from '@angular/common';


const routes: Route[] = [
  {path: '', component: LandingPageComponent},
  {path: 'products', component: ProductsPageComponent},
];

@NgModule({
  declarations: [
    LandingPageComponent,
    ProductsPageComponent,
    NavbarComponent,
    FooterComponent,
    ProductCardComponent,
    ProductsListComponent
  ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule
    ]
})

export class WebModule {

}
