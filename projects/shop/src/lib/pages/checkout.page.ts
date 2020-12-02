import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-checkout-page',
  template: `
    <app-navibar [user]="user"></app-navibar>
    <app-checkout></app-checkout>
    <app-footer [user]="user"></app-footer>
  `
})

export class CheckoutPage implements OnInit {
  user: { [key: string]: any } = {ecommerce: {social: {}, logo: '', cover: null}, businessName: '', email: ''};

  constructor(private readonly userService: UserService) {
    window.scrollTo({
      top: 0
    });
  }

  ngOnInit(): void {
    this.userService.profile().then(user => {
      this.user = user;
    }).catch(reason => {
      console.log(reason);
    });
  }

}
