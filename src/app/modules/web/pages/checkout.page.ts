import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-checkout-page',
  template: `
    <app-navibar></app-navibar>
    <app-checkout></app-checkout>
    <app-footer></app-footer>
  `
})

export class CheckoutPage implements OnInit {
  constructor() {
    window.scrollTo({
      top: 0
    });
  }

  ngOnInit(): void {

  }

}
