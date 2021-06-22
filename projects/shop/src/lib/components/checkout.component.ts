import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {CartState} from '../states/cart.state';
import {ProductModel} from '../models/product.model';
import {MatDialog} from '@angular/material/dialog';
import {UserService} from '../services/user.service';
import {LoginDialogComponent} from './login-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfigService} from '../services/config.service';

@Component({
  selector: 'app-checkout',
  template: `
    <div class="container" style="padding: 48px 0">
      <table mat-table [dataSource]="dataSource"
             class="mat-elevation-z2" style="width: 100%">

        <!-- Position Column -->
        <ng-container matColumnDef="product">
          <th mat-header-cell *matHeaderCellDef>
            <h1>
              Products
            </h1>
          </th>
          <td mat-cell *matCellDef="let element">
            <div>
              <img class="cart-image" src="{{element?.product?.image?.concat('/thumbnail?width=50')}}" style="width: 100px; height: 100px;" alt="">
              <span class="card-text">{{element.product.product}}</span>
            </div>
          </td>
        </ng-container>

        <!-- Name Column -->
        <ng-container matColumnDef="price">
          <th mat-header-cell *matHeaderCellDef> Price</th>
          <td mat-cell *matCellDef="let element">
            <span class="cart-text">
              {{element.product.retailPrice | currency: 'TZS '}}
            </span>
          </td>
        </ng-container>

        <!-- Symbol Column -->
        <ng-container matColumnDef="quantity">
          <th mat-header-cell *matHeaderCellDef> Quantity</th>
          <td mat-cell *matCellDef="let element">
            <div style="padding: 4px; border-radius: 8px;" class="d-flex justify-content-center; align-items-center">
              <span (click)="removeQuantityFromCart(element)"
                    style="font-size: 30px; color: #6f6f6f; cursor: pointer; display: inline-block; padding: 5px" matRipple>-</span>
              <input [disabled]="true" style="width: 50px;margin: 0 14px;text-align: center;border: none; outline: none"
                     [value]="element.quantity">
              <span (click)="addQuantityToCart(element)"
                    style="font-size: 30px; color: #6f6f6f; cursor: pointer; display: inline-block; padding: 5px"
                    matRipple>+</span>
            </div>
          </td>
        </ng-container>

        <!-- Weight Column -->
        <ng-container matColumnDef="total">
          <th mat-header-cell *matHeaderCellDef> Total</th>
          <td mat-cell *matCellDef="let element">
            <span class="cart-text">
              {{getSubTotal(element) | currency: 'TZS '}}
            </span>
          </td>
        </ng-container>

        <ng-container matColumnDef="action">
          <th mat-header-cell *matHeaderCellDef></th>
          <td mat-cell *matCellDef="let element">
            <button (click)="removeItemFromCart(element)" mat-icon-button>
              <mat-icon>
                close
              </mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
      <div *ngIf="dataSource.data.length > 0" style="margin: 16px 0; padding: 8px">
        <h1 style="font-weight: bold">Total : {{getTotal() | currency: 'TZS '}}</h1>
        <form [formGroup]="mobileFormGroup" (ngSubmit)="mobile()">
          <mat-form-field appearance="outline" style="width: 300px">
            <mat-label>Mobile Number</mat-label>
            <input type="number" placeholder="+255XXXXXXXXX" matInput formControlName="mobile">
            <mat-error>Field required</mat-error>
          </mat-form-field>
        </form>
      </div>
      <div class="d-flex" style="margin-top: 24px">
        <button [disabled]="cartState.isCheckout | async" routerLink="/shops/{{projectId}}/products" mat-button color="primary"
                style="flex-grow: 1; margin: 5px; font-size: 20px">
          CONTINUE SHOPPING
        </button>
        <button [disabled]="cartState.isCheckout | async" *ngIf="dataSource.data.length > 0" (click)="checkOut()"
                style="flex-grow: 1; margin: 5px; font-size: 20px"
                mat-raised-button color="primary">
          PROCEED TO CHECKOUT
          <div *ngIf="cartState.isCheckout | async" class="spinner-border"></div>
        </button>
      </div>
    </div>
  `,
  styleUrls: ['../styles/cart.style.css']
})

export class CheckoutComponent implements OnInit {
  displayedColumns = ['product', 'price', 'quantity', 'total', 'action'];
  dataSource: MatTableDataSource<{ quantity: number, product: ProductModel }>
    = new MatTableDataSource<{ quantity: number, product: ProductModel }>([]);
  mobileFormGroup: FormGroup;
  projectId: any;

  constructor(public readonly cartState: CartState,
              private readonly userService: UserService,
              private readonly snack: MatSnackBar,
              private readonly router: Router,
              public readonly config: ConfigService,
              private readonly formBuilder: FormBuilder,
              private readonly dialog: MatDialog) {
    this.projectId = this.config.shopDetails.value.projectId;
  }

  ngOnInit(): void {
    this.mobileFormGroup = this.formBuilder.group({
      mobile: ['', [Validators.nullValidator, Validators.required]]
    });
    this.cartState.carts.subscribe(value => {
      if (value) {
        this.dataSource.data = value;
      }
    });
  }

  getTotal(): number {
    return this.cartState.carts.value.map(x => x.quantity * x.product.retailPrice).reduce((a, b) => a + b, 0);
  }

  removeItemFromCart(cart: { quantity: number; product: ProductModel }): void {
    this.cartState.removeItemToCart(cart.product.id);
  }

  getSubTotal(element: any): number {
    return element.product.retailPrice * element.quantity;
  }

  removeQuantityFromCart(element: { quantity: number, product: ProductModel }): void {
    this.cartState.decrementItemFromCart(element.product.id);
  }

  addQuantityToCart(element: { quantity: number, product: ProductModel }): void {
    this.cartState.incrementItemFromCart(element.product.id);
  }

  checkOut(): void {
    this.mobileFormGroup.markAsTouched();
    if (!this.mobileFormGroup.valid) {
      this.snack.open('Please add your available mobile phone number to place order', 'Ok', {
        duration: 2000
      });
      return;
    }
    this.userService.isLoggedIn().then(value => {
      if (value) {
        this.cartState.checkOut(value, this.mobileFormGroup.value.mobile).then(_ => {
          this.snack.open('Your order is submitted', 'Ok', {
            duration: 2000
          }).afterDismissed().subscribe(__ => {
            this.router.navigateByUrl('/orders').catch();
          });
        });
      } else {
        this.dialog.open(LoginDialogComponent, {})
          .afterClosed().subscribe(loggedUser => {
          if (loggedUser) {
            this.cartState.checkOut(loggedUser, this.mobileFormGroup.value.mobile).then(_ => {
              this.snack.open('Your order is submitted', 'Ok', {
                duration: 2000
              });
              this.router.navigateByUrl('/orders').catch();
            });
          } else {
            this.snack.open('Login to continue with checkout', 'Ok', {
              duration: 2000
            });
          }
        });
      }
    });
  }

  mobile(): void {

  }
}
