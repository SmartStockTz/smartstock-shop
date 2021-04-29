import { Component, Input } from '@angular/core';
import { ProductModel } from '../models/product.model';

@Component({
  selector: 'app-products-list',
  template: `
    <div class="row">
      <div class="col-lg-4 col-sm-6 col-md-6 col-sm-12 col-12" *ngFor="let product of products">
        <app-product-card [product]="product"></app-product-card>
      </div>
      <div class="col-lg-4 col-sm-6 col-md-6 col-sm-12 col-12"></div>
    </div>
  `,
})
export class ProductsListComponent {
  @Input() products: ProductModel[] = [];
}
