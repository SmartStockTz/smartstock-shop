import {Component, OnInit} from '@angular/core';
import {MallState} from '../states/mall.state';

@Component({
  selector: 'app-shop-tabs',
  template: `
    <mat-tab-group class="t" mat-align-tabs="center" (selectedIndexChange)="tabSelected($event)">
      <mat-tab label="Retail"></mat-tab>
      <mat-tab label="Wholesale"></mat-tab>
    </mat-tab-group>
  `,
  styleUrls: ['../styles/shop-tabs.style.scss']
})

export class ShopTabsComponent implements OnInit {
  constructor(private readonly mallState: MallState) {
  }

  tabSelected($event: number): void {
    this.mallState.selectedTab.next($event);
  }

  ngOnInit(): void {
    // const el = document.querySelector('.t');
    // const observer = new IntersectionObserver(
    //   ([e]) => {
    //     console.log(e.target.classList);
    //     console.log(e.intersectionRatio);
    //     e.target.classList.toggle('t-pinned', e.intersectionRatio < 1);
    //     console.log('pinned');
    //     console.log(e.target.classList);
    //   },
    //   {threshold: [1]}
    // );
    // observer.observe(el);
  }
}

