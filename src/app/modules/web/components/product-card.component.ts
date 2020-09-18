import {Component, Input} from '@angular/core';
import {ProductModel} from '../models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: '../templates/product-card.template.html'
})

export class ProductCardComponent {
  @Input() product: ProductModel;
}
