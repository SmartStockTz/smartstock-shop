import {Component} from '@angular/core';

@Component({
  selector: 'app-products-list',
  template: `
    <div class="row">
      <div class="col-lg-3 col-sm-6">
        <app-product-card [product]="{name: 'Maembe', image: 'assets/img/resources/shop2.jpg'}"></app-product-card>
      </div>
      <div class="col-lg-3 col-sm-6">
        <div class="product-box">
          <figure>
            <span class="hot">Hot</span>
            <img src="assets/img/resources/shop2.jpg" alt="">
            <ul class="cart-optionz">
              <li><a href="#" title="Add Cart" data-toggle="tooltip"><i class="ti-shopping-cart"></i></a></li>
              <li><a href="#" title="Quick Shop" data-toggle="tooltip"><i class="ti-eye"></i></a></li>
              <li><a href="#" title="Wishlist" data-toggle="tooltip"><i class="ti-heart"></i></a></li>
              <li><a href="#" title="Compare" data-toggle="tooltip"><i class="ti-split-v-alt"></i></a></li>
            </ul>
          </figure>
          <div class="product-name">
            <h5><a href="#" title="">CARROT</a></h5>
            <ul class="starz">
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
            </ul>

          </div>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6">
        <div class="product-box">
          <figure>
            <img src="assets/img/resources/shop3.jpg" alt="">
            <ul class="cart-optionz">
              <li><a href="#" title="Add Cart" data-toggle="tooltip"><i class="ti-shopping-cart"></i></a></li>
              <li><a href="#" title="Quick Shop" data-toggle="tooltip"><i class="ti-eye"></i></a></li>
              <li><a href="#" title="Wishlist" data-toggle="tooltip"><i class="ti-heart"></i></a></li>
              <li><a href="#" title="Compare" data-toggle="tooltip"><i class="ti-split-v-alt"></i></a></li>
            </ul>
          </figure>
          <div class="product-name">
            <h5><a href="#" title="">CUCUMBER</a></h5>
            <ul class="starz">
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
            </ul>

          </div>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6">
        <div class="product-box">
          <figure>
            <img src="assets/img/resources/wm.jpg" alt="">
            <ul class="cart-optionz">
              <li><a href="#" title="Add Cart" data-toggle="tooltip"><i class="ti-shopping-cart"></i></a></li>
              <li><a href="#" title="Quick Shop" data-toggle="tooltip"><i class="ti-eye"></i></a></li>
              <li><a href="#" title="Wishlist" data-toggle="tooltip"><i class="ti-heart"></i></a></li>
              <li><a href="#" title="Compare" data-toggle="tooltip"><i class="ti-split-v-alt"></i></a></li>
            </ul>
          </figure>
          <div class="product-name">
            <h5><a href="#" title="">WATER MELON</a></h5>
            <ul class="starz">
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
            </ul>

          </div>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6">
        <div class="product-box">
          <figure>
            <span class="sale">sale</span>
            <img src="assets/img/resources/shop4.jpg" alt="">
            <ul class="cart-optionz">
              <li><a href="#" title="Add Cart" data-toggle="tooltip"><i class="ti-shopping-cart"></i></a></li>
              <li><a href="#" title="Quick Shop" data-toggle="tooltip"><i class="ti-eye"></i></a></li>
              <li><a href="#" title="Wishlist" data-toggle="tooltip"><i class="ti-heart"></i></a></li>
              <li><a href="#" title="Compare" data-toggle="tooltip"><i class="ti-split-v-alt"></i></a></li>
            </ul>
          </figure>
          <div class="product-name">
            <h5><a href="#" title="">ONION</a></h5>
            <ul class="starz">
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6">
        <div class="product-box">
          <figure>
            <img src="assets/img/resources/vz3.jpg" alt="">
            <ul class="cart-optionz">
              <li><a href="#" title="Add Cart" data-toggle="tooltip"><i class="ti-shopping-cart"></i></a></li>
              <li><a href="#" title="Quick Shop" data-toggle="tooltip"><i class="ti-eye"></i></a></li>
              <li><a href="#" title="Wishlist" data-toggle="tooltip"><i class="ti-heart"></i></a></li>
              <li><a href="#" title="Compare" data-toggle="tooltip"><i class="ti-split-v-alt"></i></a></li>
            </ul>
          </figure>
          <div class="product-name">
            <h5><a href="#" title="">CASSAVA</a></h5>
            <ul class="starz">
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
            </ul>

          </div>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6">
        <div class="product-box">
          <figure>
            <img src="assets/img/resources/ps3.jpg" alt="">
            <ul class="cart-optionz">
              <li><a href="#" title="Add Cart" data-toggle="tooltip"><i class="ti-shopping-cart"></i></a></li>
              <li><a href="#" title="Quick Shop" data-toggle="tooltip"><i class="ti-eye"></i></a></li>
              <li><a href="#" title="Wishlist" data-toggle="tooltip"><i class="ti-heart"></i></a></li>
              <li><a href="#" title="Compare" data-toggle="tooltip"><i class="ti-split-v-alt"></i></a></li>
            </ul>
          </figure>
          <div class="product-name">
            <h5><a href="#" title="">PEAS</a></h5>
            <ul class="starz">
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
            </ul>

          </div>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6">
        <div class="product-box">
          <figure>
            <span class="sale">sale</span>
            <img src="assets/img/resources/shop7.jpg" alt="">
            <ul class="cart-optionz">
              <li><a href="#" title="Add Cart" data-toggle="tooltip"><i class="ti-shopping-cart"></i></a></li>
              <li><a href="#" title="Quick Shop" data-toggle="tooltip"><i class="ti-eye"></i></a></li>
              <li><a href="#" title="Wishlist" data-toggle="tooltip"><i class="ti-heart"></i></a></li>
              <li><a href="#" title="Compare" data-toggle="tooltip"><i class="ti-split-v-alt"></i></a></li>
            </ul>
          </figure>
          <div class="product-name">
            <h5><a href="#" title="">POTATOES</a></h5>
            <ul class="starz">
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
            </ul>

          </div>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6">
        <div class="product-box">
          <figure>

            <img src="assets/img/resources/bn1.jpg" alt="">
            <ul class="cart-optionz">
              <li><a href="#" title="Add Cart" data-toggle="tooltip"><i class="ti-shopping-cart"></i></a></li>
              <li><a href="#" title="Quick Shop" data-toggle="tooltip"><i class="ti-eye"></i></a></li>
              <li><a href="#" title="Wishlist" data-toggle="tooltip"><i class="ti-heart"></i></a></li>
              <li><a href="#" title="Compare" data-toggle="tooltip"><i class="ti-split-v-alt"></i></a></li>
            </ul>
          </figure>
          <div class="product-name">
            <h5><a href="#" title="">BEANS</a></h5>
            <ul class="starz">
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>

            </ul>

          </div>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6">
        <div class="product-box">
          <figure>
            <span class="new">new</span>
            <img src="assets/img/resources/shop9.jpg" alt="">
            <ul class="cart-optionz">
              <li><a href="#" title="Add Cart" data-toggle="tooltip"><i class="ti-shopping-cart"></i></a></li>
              <li><a href="#" title="Quick Shop" data-toggle="tooltip"><i class="ti-eye"></i></a></li>
              <li><a href="#" title="Wishlist" data-toggle="tooltip"><i class="ti-heart"></i></a></li>
              <li><a href="#" title="Compare" data-toggle="tooltip"><i class="ti-split-v-alt"></i></a></li>
            </ul>
          </figure>
          <div class="product-name">
            <h5><a href="#" title="">TOMATOES</a></h5>
            <ul class="starz">
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
            </ul>

          </div>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6">
        <div class="product-box">
          <figure>
            <img src="assets/img/resources/mc3.jpg" alt="">
            <ul class="cart-optionz">
              <li><a href="#" title="Add Cart" data-toggle="tooltip"><i class="ti-shopping-cart"></i></a></li>
              <li><a href="#" title="Quick Shop" data-toggle="tooltip"><i class="ti-eye"></i></a></li>
              <li><a href="#" title="Wishlist" data-toggle="tooltip"><i class="ti-heart"></i></a></li>
              <li><a href="#" title="Compare" data-toggle="tooltip"><i class="ti-split-v-alt"></i></a></li>
            </ul>
          </figure>
          <div class="product-name">
            <h5><a href="#" title="">RICE</a></h5>
            <ul class="starz">
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6">
        <div class="product-box">
          <figure>
            <span class="hot">hot</span>
            <img src="assets/img/resources/un1.jpg" alt="">
            <ul class="cart-optionz">
              <li><a href="#" title="Add Cart" data-toggle="tooltip"><i class="ti-shopping-cart"></i></a></li>
              <li><a href="#" title="Quick Shop" data-toggle="tooltip"><i class="ti-eye"></i></a></li>
              <li><a href="#" title="Wishlist" data-toggle="tooltip"><i class="ti-heart"></i></a></li>
              <li><a href="#" title="Compare" data-toggle="tooltip"><i class="ti-split-v-alt"></i></a></li>
            </ul>
          </figure>
          <div class="product-name">
            <h5><a href="#" title="">FLOUR</a></h5>
            <ul class="starz">
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
            </ul>

          </div>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6">
        <div class="product-box">
          <figure>

            <img src="assets/img/resources/cc3.jpg" alt="">
            <ul class="cart-optionz">
              <li><a href="#" title="Add Cart" data-toggle="tooltip"><i class="ti-shopping-cart"></i></a></li>
              <li><a href="#" title="Quick Shop" data-toggle="tooltip"><i class="ti-eye"></i></a></li>
              <li><a href="#" title="Wishlist" data-toggle="tooltip"><i class="ti-heart"></i></a></li>
              <li><a href="#" title="Compare" data-toggle="tooltip"><i class="ti-split-v-alt"></i></a></li>
            </ul>
          </figure>
          <div class="product-name">
            <h5><a href="#" title="">COCONUTS</a></h5>
            <ul class="starz">
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
            </ul>

          </div>
        </div>
      </div>

      <!--              <div class="col-lg-12">-->
      <!--                <ul class="paginationz">-->
      <!--                  <li class="prev"><a title="" href="#"><i class="fa fa-angle-left"></i></a></li>-->
      <!--                  <li><a title="" href="next1.html">01</a></li>-->
      <!--                  <li><a title="" href="D:\\winku template\\page2.html" class="active">02</a></li>-->
      <!--                  <li><a title="" href="#">03</a></li>-->
      <!--                  <li><a title="" href="#">04</a></li>-->
      <!--                  <li class="space">.......</li>-->
      <!--                  <li><a title="" href="#">21</a></li>-->
      <!--                  <li class="next"><a title="" href="#"><i class="fa fa-angle-right"></i></a></li>-->
      <!--                </ul>-->
      <!--              </div>&lt;!&ndash; pagination &ndash;&gt;-->
    </div>
  `
})

export class ProductsListComponent {
}
