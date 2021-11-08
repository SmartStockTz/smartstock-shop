import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {StockModel} from '../models/stock.model';
import {MallState} from '../states/mall.state';
import {Subject, takeUntil} from 'rxjs';
import {FormControl} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CartState} from '../states/cart.state';
import {CartModel} from '../models/cart.model';

@Component({
  selector: 'app-cart-item',
  template: `
    <div class="product-container">
      <div class="product-head">
        <span class="name">{{cart.product.product}}</span>
        <span style="flex: 1 1 auto"></span>
        <button [disabled]="addToCartLoad" (click)="removeToCart()" mat-button color="warn" class="view-shop">
          Remove
        </button>
      </div>
      <hr class="line">
      <img *ngIf="showCover" (error)="imgError($event)" src="{{cart.product?.images? cart.product.images[0]: null}}"
           alt="cover photo" class="cover">
      <div class="category">
        <!--        <mat-icon color="primary">dashboard</mat-icon>-->
        <a [routerLink]="'/shops/'+cart.shop.projectId">From : {{cart.shop.name}}  | {{cart.channel}}</a>
      </div>
      <p class="price">
        {{currency ? currency : 'Tsh'}} {{price | number}}
      </p>
      <div class="category">
        <span> {{quantityFormControl.value}} x ({{channelQuantity}}) {{cart.product.unit}}</span>
      </div>
      <div class="quantity-container">
        <button (click)="removeQuantity()" color="primary" mat-icon-button>
          <mat-icon>remove_circle_outline</mat-icon>
        </button>
        <button (click)="addQuantity()" color="primary" mat-icon-button>
          <mat-icon>add_circle_outline</mat-icon>
        </button>
        <input disabled
               min="0" [value]="quantityFormControl.value" class="quantity-input" placeholder="Quantity..."
               type="number">
      </div>
    </div>
  `,
  styleUrls: ['../styles/product.style.scss']
})

export class CartItemComponent implements OnInit, OnDestroy {
  @Input() cart: CartModel;
  showCover = true;
  products: StockModel[] = [];
  currency = '';
  price = 0;
  private destroyer = new Subject();
  channelQuantity = 1;
  quantityFormControl = new FormControl('');
  addToCartLoad = false;

  constructor(public readonly mallState: MallState,
              public readonly cartState: CartState) {
  }

  ngOnInit(): void {
    this.quantityFormControl.setValue(this.cart.quantity);
    this.currency = this.mallState.shop.value?.shop?.settings?.currency;
    if (this.cart.channel === 'retail') {
      this.price = this.cart.product.retailPrice;
      this.channelQuantity = 1;
    }
    if (this.cart.channel === 'whole') {
      this.price = this.cart.product.wholesalePrice;
      this.channelQuantity = this.cart.product.wholesaleQuantity;
    }
  }

  imgError($event: ErrorEvent): void {
    $event.preventDefault();
    this.showCover = false;
  }

  ngOnDestroy(): void {
    this.destroyer.next('done');
  }

  removeQuantity(): void {
    if (this.quantityFormControl.value > 1) {
      this.cartState.incrementCart(this.cart.id, -1);
    }
  }

  addQuantity(): void {
    this.cartState.incrementCart(this.cart.id, 1);
  }

  removeToCart(): void {
    this.cartState.removeToCart(this.cart.id);
  }
}
