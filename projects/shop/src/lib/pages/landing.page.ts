import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-landing',
  template: `
    <app-navibar  [user]="user"></app-navibar>
    <div style="min-height: 100vh;">
      <ssm-header [user]="user"></ssm-header>
      <section>
        <div style="padding-bottom: 76px">
          <ssm-products-by-categories-list></ssm-products-by-categories-list>
        </div>
        <section id="faq" class="faq section-bg">
          <div class="container">
            <div class="section-title">
              <h2>Frequently Asked Questions</h2>
            </div>
            <div class="row  d-flex align-items-stretch">
              <div class="col-lg-6 faq-item" data-aos="fade-up">
                <h4>How long does exportation take?</h4>
                <p>
                  We provide our services East Africa and beyond. World wide,
                  Anywhere and everywhere.
                </p>
              </div>

              <div
                class="col-lg-6 faq-item"
                data-aos="fade-up"
                data-aos-delay="100">
                <h4>Do we charge delivery cost?</h4>
                <p>Yes we charge delivery fee but on very affordable cost.</p>
              </div>

              <div
                class="col-lg-6 faq-item"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <h4>Do we offer compensation?</h4>
                <p>
                  We do offer compensation for goods, please read our terms and
                  conditions.
                </p>
              </div>

              <div
                class="col-lg-6 faq-item"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <h4>How long does it take to recieve an order?</h4>
                <p>
                  It takes one day to recieve an order anywhere around Dar es
                  salaam. A minimum of Two days for those who reside outside of
                  Dar es salaam region.
                </p>
              </div>
              <div
                class="col-lg-6 faq-item"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <h4>Do we work throughout the week?</h4>
                <p>
                  Yes indeed we do. We work everyday throughout the week, from
                  Monday to Monday.
                </p>
              </div>
              <div
                class="col-lg-6 faq-item"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <h4>Do we do business beyond Tanzania?</h4>
                <p>
                  We warmly encourage anyone from and outside Tanzania to contact
                  us in demand of our services.
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>
      <app-cart-preview></app-cart-preview>
      <app-footer [user]="user"></app-footer>
    </div>
  `,
  styleUrls: ['../styles/landingpage.css'],
})
export class LandingPageComponent implements OnInit {
  user: { [key: string]: any } = {ecommerce: {social: {}, logo: '', cover: null}, businessName: '', email: ''};
  isLoading = true;

  constructor(private readonly userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.profile().then(user => {
      this.user = user;
      this.isLoading = false;
    }).catch(_ => {
      console.log(_);
    });
  }
}
