import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {OrderModel} from '../models/order.model';
import {MatTableDataSource} from '@angular/material/table';
import {CartState} from '../states/cart.state';
import {OrderState} from '../states/order.state';

@Component({
  selector: 'app-payment-header',
  template: `
    <div class="line">
      <span class="invoice-number">Invoice #</span>
      <span class="line-space"></span>
      <span class="invoice-number">Status</span>
    </div>
    <div class="line">
      <span class="invoice-number-body">{{order.id}}</span>
      <span class="line-space"></span>
      <span *ngIf="order.paid" class="paid-label">PAID</span>
      <span *ngIf="!order.paid" class="not-paid-label">NOT PAID</span>
    </div>
    <div class="line">
      <span class="line-space"></span>
      <button [disabled]="orderState.orderStatusProgress | async"
              *ngIf="!order.paid"
              (click)="refresh()" mat-button color="primary">
        Refresh Now
        <mat-progress-spinner mode="indeterminate" style="display: inline-block"
                              *ngIf="orderState.orderStatusProgress | async"
                              diameter="20" color="primary">
        </mat-progress-spinner>
      </button>
    </div>
    <div *ngIf="!order.paid" class="line">
      <span class="line-space"></span>
      refresh in <span style="margin-left: 5px" id="tcounter">01:00</span>
    </div>
    <div class="table-container">
      <table mat-table [dataSource]="costDataSource">
        <ng-container matColumnDef="cost">
          <th class="table-title" mat-header-cell *matHeaderCellDef> Cost</th>
          <td class="table-data" mat-cell *matCellDef="let element">Tsh {{element.cost | number}} </td>
        </ng-container>
        <ng-container matColumnDef="fee">
          <th class="table-title" mat-header-cell *matHeaderCellDef> Process Fee</th>
          <td class="table-data" mat-cell *matCellDef="let element">Tsh {{element.fee | number}} </td>
        </ng-container>
        <ng-container matColumnDef="total">
          <th class="table-title" mat-header-cell *matHeaderCellDef> Total</th>
          <td class="table-data" mat-cell *matCellDef="let element">Tsh {{element.total | number}} </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="columns"></tr>
        <tr mat-row *matRowDef="let row; columns: columns;"></tr>
      </table>
    </div>
  `,
  styleUrls: ['../styles/order-header.style.scss']
})

export class PaymentHeaderComponent implements OnInit, OnDestroy {
  @Input() order: OrderModel;
  costDataSource = new MatTableDataSource([]);
  columns: string[] = ['cost', 'fee', 'total'];
  total = 0;
  private interval: NodeJS.Timeout;

  constructor(private readonly cartState: CartState,
              public readonly orderState: OrderState) {
  }

  refresh(): void {
    this.orderState.refreshStatus(this.order.id);
  }

  ngOnInit(): void {
    const fee = this.cartState.findServiceCharge(this.order.total);
    this.total = this.order.total + fee;
    this.costDataSource.data.push({
      cost: this.order.total,
      fee,
      total: this.total,
    });
    this.startTimer(60);
  }

  startTimer(duration: number): void {
    let timer = duration;
    let minutes;
    let seconds;
    this.interval = setInterval(() => {
      minutes = parseInt(String(timer / 60), 10);
      seconds = parseInt(String(timer % 60), 10);

      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      const a = document.getElementById('tcounter');
      if (a){
        a.textContent = minutes + ':' + seconds;
      }

      if (--timer < 0) {
        timer = duration;
        this.refresh();
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
