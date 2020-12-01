import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ssm-header',
  template: `
    <section id="hero" style="height: 60vh">
      <div class="hero-container">
        <div
          id="heroCarousel"
          class="carousel slide carousel-fade"
          data-ride="carousel">
          <ol class="carousel-indicators" id="hero-carousel-indicators"></ol>

          <div class="carousel-inner" role="listbox">
            <!-- Slide 1 -->
            <div *ngIf="user"
                 [ngClass]="user.ecommerce.cover?withImage:withoutImage"
                 style="background-image: url({{user.ecommerce.cover}});">
              <div class="carousel-container" style="height: 60vh">
                <div class="carousel-content container">
                  <h2 class="animate__animated animate__fadeInDown">
                    Welcome to <span>{{user.businessName}}</span>
                  </h2>
                  <p class="animate__animated animate__fadeInUp"></p>
                  <h2>About Us</h2>
                  <p>
                    {{user.ecommerce.about}}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})

export class HeaderComponent implements OnInit {
  @Input() user: { [key: string]: any } = {ecommerce: {social: {}, logo: '', cover: null}, businessName: '', email: ''};
  withImage = ['carousel-item', 'active'];
  withoutImage = ['carousel-item', 'active', 'primary-bg-color'];

  constructor() {
  }

  ngOnInit(): void {
    // this.userService.profile().then(value => {
    //   this.user = value;
    // }).catch(_ => {
    //   console.log(_);
    // });
  }
}
