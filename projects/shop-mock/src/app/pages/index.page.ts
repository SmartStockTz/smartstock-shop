import {Component} from '@angular/core';

@Component({
  selector: 'app-index-page',
  template: `
    <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh; flex-direction: column">
      <h1>E-Commerce Mock</h1>
      <a [routerLink]="['/shops/180841b4-fc74-4609-bce8-48c130947252']">
        Go to exist shop
      </a>
      <a [routerLink]="['/shops/lbpharmacy']">
        Go to non exist shop
      </a>
    </div>
  `,
  styleUrls: []
})

export class IndexPage {

  constructor() {
  }
}
