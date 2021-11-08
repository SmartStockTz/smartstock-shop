import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {StockModel} from '@smartstocktz/core-libs';
import {MallState} from '../states/mall.state';
import {Subject, takeUntil} from 'rxjs';
import {FormControl} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-product',
  template: `
    <div class="product-container">
      <div class="product-head">
        <span class="name">{{product.product}}</span>
        <span style="flex: 1 1 auto"></span>
        <button (click)="addToCart(qt)" mat-button color="primary" class="view-shop">Add to cart
        </button>
      </div>
      <hr class="line">
      <img *ngIf="showCover" (error)="imgError($event)" src="{{product?.images? product.images[0]: null}}"
           alt="cover photo" class="cover">
      <div class="category">
        <!--        <mat-icon color="primary">dashboard</mat-icon>-->
        <span>{{product.category}}</span>
      </div>
      <p class="price">
        {{currency ? currency : 'Tsh'}} {{price | number}}
      </p>
      <div class="category">
        <span> {{quantityFormControl.value}} x ({{channelQuantity}}) {{product.unit}}</span>
      </div>
      <div class="quantity-container">
        <button (click)="removeQuantity()" color="primary" mat-icon-button>
          <mat-icon>remove_circle_outline</mat-icon>
        </button>
        <button (click)="addQuantity()" color="primary" mat-icon-button>
          <mat-icon>add_circle_outline</mat-icon>
        </button>
        <input #qt min="0" [formControl]="quantityFormControl" class="quantity-input" placeholder="Quantity..."
               type="number">
        <button (click)="addToCart(qt)" color="primary" mat-icon-button>
          <mat-icon>send</mat-icon>
        </button>
      </div>
    </div>
  `,
  styleUrls: ['../styles/product.style.scss']
})

export class ProductComponent implements OnInit, OnDestroy {
  @Input() product: StockModel;
  showCover = true;
  products: StockModel[] = [];
  isLoadPreview = true;
  currency = '';
  price = 0;
  private destroyer = new Subject();
  channelQuantity = 1;
  quantityFormControl = new FormControl('');

  constructor(public readonly mallState: MallState,
              private readonly snack: MatSnackBar) {
  }

  ngOnInit(): void {
    this.currency = this.mallState.shop.value?.shop?.settings?.currency;
    this.mallState.selectedTab.pipe(takeUntil(this.destroyer)).subscribe(value => {
      if (value === 0) {
        this.price = this.product.retailPrice;
        this.channelQuantity = 1;
      }
      if (value === 1) {
        this.price = this.product.wholesalePrice;
        this.channelQuantity = this.product.wholesaleQuantity;
      }
    });
  }

  imgError($event: ErrorEvent): void {
    $event.preventDefault();
    this.showCover = false;
  }

  ngOnDestroy(): void {
    this.destroyer.next('done');
  }

  removeQuantity(): void {
    if (this.quantityFormControl.value > 0) {
      this.quantityFormControl.setValue(parseInt(this.quantityFormControl.value, 10) - 1);
    }
  }

  addQuantity(): void {
    let qV = parseInt(this.quantityFormControl.value, 10);
    if (isNaN(qV)) {
      qV = 0;
    }
    this.quantityFormControl.setValue(qV + 1);
  }

  addToCart(qt: HTMLInputElement): void {
    if (this.quantityFormControl.value <= 0) {
      this.snack.open('Quantity must be greater than zero', 'Ok', {
        duration: 1000
      });
      qt.focus();
    } else {
      this.quantityFormControl.setValue('');
    }
  }
}
