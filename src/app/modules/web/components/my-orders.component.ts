import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {OrderModel} from '../models/order.model';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {OrderState} from '../states/orders.state';
import {OrdersTableOptionsComponent} from './orders-table-options.component';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-my-orders',
  template: `
    <div class="container col-11 col-sm-12 col-md-10 col-xl-9 col-lg-9" style="padding: 50px 2px">
      <mat-progress-bar mode="indeterminate" color="primary" *ngIf="(orderState.getOrderFlag | async)===true"></mat-progress-bar>
      <mat-card>
        <mat-card-header>
          <!--          <app-orders-table-options></app-orders-table-options>-->
        </mat-card-header>
        <table mat-table [dataSource]="ordersDataTable">
          <ng-container matColumnDef="date">
            <th mat-header-cell *cdkHeaderCellDef>Date</th>
            <td mat-cell *cdkCellDef="let order">{{order.createdAt | date}}</td>
          </ng-container>
          <ng-container matColumnDef="customer">
            <th mat-header-cell *cdkHeaderCellDef>Customer</th>
            <td mat-cell *cdkCellDef="let order">{{order.displayName}}</td>
          </ng-container>
          <ng-container matColumnDef="amount">
            <th mat-header-cell *cdkHeaderCellDef>Amount</th>
            <td mat-cell *cdkCellDef="let order">{{order.total | currency:'TZS '}}</td>
          </ng-container>
          <ng-container matColumnDef="paid">
            <th mat-header-cell *cdkHeaderCellDef>Paid</th>
            <td mat-cell *cdkCellDef="let order">
              {{order.paid}}
              <!--              <smartstock-oder-paid-status [order]="order"></smartstock-oder-paid-status>-->
            </td>
          </ng-container>
          <!--          <ng-container matColumnDef="mobile">-->
          <!--            <th mat-header-cell *cdkHeaderCellDef>Mobile</th>-->
          <!--            <td mat-cell *cdkCellDef="let order">{{order.mobile}}</td>-->
          <!--          </ng-container>-->
          <ng-container matColumnDef="status">
            <th mat-header-cell *cdkHeaderCellDef>Status</th>
            <td mat-cell *cdkCellDef="let order">
              <span>{{order.status}}</span>
            </td>
          </ng-container>
          <ng-container matColumnDef="action">
            <th mat-header-cell *cdkHeaderCellDef>Options</th>
            <td mat-cell *cdkCellDef="let order">
              <button (click)="showOptions(order)" color="primary" mat-button>
                OPTIONS
                <mat-icon>more_vert</mat-icon>
              </button>
            </td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="ordersColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: ordersColumns;"></tr>
        </table>
        <div *ngIf="orderState.orders.value.length === 0" class="d-flex justify-content-center align-items-center" style="padding: 16px">
          <smartstock-data-not-ready></smartstock-data-not-ready>
        </div>
        <mat-paginator #paginator [pageSize]="10" [showFirstLastButtons]="true" [pageSizeOptions]="[10,20,50]"></mat-paginator>
      </mat-card>
    </div>
  `,
  styleUrls: ['../styles/my-orders.style.css']
})
export class MyOrdersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ordersDataTable: MatTableDataSource<OrderModel> = new MatTableDataSource<OrderModel>([]);
  ordersColumns = ['date', 'amount', 'paid', 'status', 'action'];

  constructor(public readonly orderState: OrderState,
              private readonly userService: UserService,
              private readonly bottomSheet: MatBottomSheet) {
    this.ordersDataTable.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.ordersDataTable.paginator = this.paginator;
    this.orderState.orders.subscribe(value => {
      this.ordersDataTable.data = value;
      if (!this.ordersDataTable.paginator) {
        this.ordersDataTable.paginator = this.paginator;
      }
    });
    this.userService.isLoggedIn().then(value => {
      this.orderState.getOrder(value);
    });
    this.handleTableFilter();
    window.scrollTo({
      top: 0
    });
  }

  handleTableFilter(): void {
    this.orderState.orderFilterKeyword.subscribe(value => {
      this.ordersDataTable.filter = value.toLowerCase();
    });
  }

  showOptions(order: OrderModel): void {
    this.bottomSheet.open(OrdersTableOptionsComponent, {
      data: {
        order
      },
      closeOnNavigation: true
    });
  }
}
