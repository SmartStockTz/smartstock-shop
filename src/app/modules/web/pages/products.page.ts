import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';
import {ProductModel} from '../models/product.model';
import {BFast} from 'bfastjs';

@Component({
  selector: 'app-products',
  template: `
    <app-navibar></app-navibar>
    <section>
      <div class="gap100">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="shop-page">
                <div class="shop-filter-sec">
                  <span>Showing 1–12 of 42 results</span>
                  <div class="shop-filter">
                    <select>
                      <option>sort by</option>
                      <option>newest</option>
                      <option>price low to high</option>
                      <option>price high to low</option>
                      <option>sort by average rating</option>
                    </select>
                  </div>
                </div>
                <app-products-list [products]="products"></app-products-list>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <a class="shopping-cart" href="#" title=""><i class="fa fa-shopping-bag"></i><span>02</span></a>
    <app-footer></app-footer>
  `
})

export class ProductsPageComponent implements OnInit, OnDestroy {
  products: ProductModel[] = [];
  changes = BFast.database().table('stocks').query()
    .changes();

  constructor(private readonly productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.getProducts().then(value => {
      this.products = value;
    }).catch(reason => {
      console.log(reason);
    });

    this.changes.addListener(response => {
      if (response.body.change && response.body.change.name === 'create') {
        this.products.push(response.body.change.snapshot);
      }
    });
  }

  ngOnDestroy(): void {
    this.changes.close();
  }
}
