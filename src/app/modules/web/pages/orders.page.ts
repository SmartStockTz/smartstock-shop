import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderState} from '../states/orders.state';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-orders-page',
  template: `
    <app-navibar [user]="user"></app-navibar>
    <app-my-orders></app-my-orders>
    <app-footer [user]="user"></app-footer>
  `
})
export class OrdersPage implements OnInit, OnDestroy {
  user: { [key: string]: any } = {ecommerce: {social: {}, logo: '', cover: ''}, businessName: '', email: ''};

  constructor(private readonly orderState: OrderState, private readonly userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.profile().then(user => {
      this.user = user;
    }).catch(reason => {
      console.log(reason);
    });
  }

  ngOnDestroy(): void {
    this.orderState.orders.next([]);
  }

}
