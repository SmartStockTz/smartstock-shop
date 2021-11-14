import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OrderState} from '../states/order.state';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CartState} from '../states/cart.state';
import {UserService} from '@smartstocktz/core-libs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-checkout',
  template: `
    <div class="checkout-container">
      <form class="checkout-container-item"
            [formGroup]="shippingForm" *ngIf="shippingForm" (ngSubmit)="formSubmitted($event)">
        <div class="product-container">
          <div class="product-head">
            <span class="name">Mode</span>
            <span style="flex: 1 1 auto"></span>
          </div>
          <hr class="line">
          <p class="mode-detail">How you want your goods / service to reach you?</p>
          <mat-radio-group formControlName="mode">
            <div class="mode-row">
              <mat-radio-button value="pickup"></mat-radio-button>
              <span class="mode-row-title">PickUp</span>
              <span class="mode-row-detail">( at one of the shop that you purchase from )</span>
            </div>
            <div class="mode-row">
              <mat-radio-button value="delivery"></mat-radio-button>
              <span class="mode-row-title">Delivery</span>
              <span class="mode-row-detail">( You will pay transportation on your own )</span>
            </div>
          </mat-radio-group>
        </div>

        <div class="product-container">
          <div class="product-head">
            <span class="name">Shipping Address</span>
            <span style="flex: 1 1 auto"></span>
          </div>
          <hr class="line">
          <p class="mode-detail">This information will be used to delivery your goods if you choose that mode.</p>
          <div class="ship-form">
            <div class="form-field">
              <p class="form-control-title">Mobile</p>
              <input class="form-field-input" type="number" formControlName="mobile">
              <mat-hint class="hint-text"
                        *ngIf="!(shippingForm.get('mobile').invalid && shippingForm.get('mobile').touched)">
                Enter valid mobile number
                <!--                <a href="/help/product#name">more info</a>-->
              </mat-hint>
              <mat-error *ngIf="shippingForm.get('mobile').invalid && shippingForm.get('mobile').touched"
                         class="error-text">
                Mobile required
              </mat-error>
            </div>
          </div>
          <div class="ship-form">
            <div class="form-field">
              <p class="form-control-title">Email</p>
              <input class="form-field-input" type="email" formControlName="email">
              <mat-hint class="hint-text"
                        *ngIf="!(shippingForm.get('email').invalid && shippingForm.get('email').touched)">
                Enter valid email
                <!--                <a href="/help/product#name">more info</a>-->
              </mat-hint>
              <mat-error *ngIf="shippingForm.get('email').invalid && shippingForm.get('email').touched"
                         class="error-text">
                Email required
              </mat-error>
            </div>
          </div>
          <div class="ship-form">
            <div class="form-field">
              <p class="form-control-title">Address ( How to reach you )</p>
              <textarea class="form-field-input" rows="4" formControlName="location"></textarea>
              <mat-hint class="hint-text"
                        *ngIf="!(shippingForm.get('location').invalid && shippingForm.get('location').touched)">
                The street where you live
                <!--                <a href="/help/product#name">more info</a>-->
              </mat-hint>
              <mat-error *ngIf="shippingForm.get('location').invalid && shippingForm.get('location').touched"
                         class="error-text">
                Location required
              </mat-error>
            </div>
          </div>
          <div class="ship-form">
            <div class="form-field">
              <p class="form-control-title">Notes ( optional )</p>
              <textarea class="form-field-input" rows="2" formControlName="notes"></textarea>
              <mat-hint class="hint-text"
                        *ngIf="!(shippingForm.get('notes').invalid && shippingForm.get('notes').touched)">
                Anything we should consider
                <!--                <a href="/help/product#name">more info</a>-->
              </mat-hint>
            </div>
          </div>
        </div>
      </form>
    </div>
    <app-pay-now (pay)="saveOrder()" view="pay"></app-pay-now>
  `,
  styleUrls: ['../styles/checkout.style.scss']
})

export class CheckoutComponent implements OnInit {
  shippingForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly snack: MatSnackBar,
              private readonly cartState: CartState,
              private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute,
              private readonly userService: UserService,
              private readonly orderState: OrderState) {
  }

  saveOrder(): void {
    this.shippingForm.markAllAsTouched();
    if (this.shippingForm.valid) {
      this.shippingForm.value.mobile = this.shippingForm.value.mobile.toString();
      this.userService.currentUser().then(user => {
        this.orderState.saveOrder({
          channel: 'online',
          createdAt: new Date().toISOString(),
          date: new Date().toISOString(),
          customer: {
            email: user.email,
            id: user.id,
            displayName: user.firstname + ' ' + user.lastname,
            phone: user.mobile.toString(),
          },
          items: this.cartState.carts.value,
          paid: false,
          placedBy: {
            firstname: 'E-Commerce',
            lastname: 'E-Commerce',
            username: 'E-Commerce',
          },
          status: 'PENDING',
          total: this.cartState.totalCost.value,
          updatedAt: new Date().toISOString(),
          shipping: this.shippingForm.value,
        }).then(value => {
          this.cartState.clearCart();
          this.router
            .navigate([`../orders/${value.id}/payment`], {relativeTo: this.activatedRoute})
            .catch(console.log);
        });
      }).catch(reason => {
        this.snack.open(reason && reason.message ? reason.message : reason.toString(), 'Ok', {
          duration: 2000
        });
      });
    } else {
      this.snack.open('Fill all required fields', 'Ok', {
        duration: 2000
      });
    }
  }

  ngOnInit(): void {
    this.shippingForm = this.formBuilder.group({
      mobile: ['', [Validators.required, Validators.nullValidator, Validators.minLength(9)]],
      mode: ['pickup'],
      email: ['', [Validators.required, Validators.nullValidator, Validators.email]],
      location: ['', [Validators.required, Validators.nullValidator]],
      notes: [''],
    });
  }

  formSubmitted($event: any): void {
    $event.preventDefault();
  }
}
