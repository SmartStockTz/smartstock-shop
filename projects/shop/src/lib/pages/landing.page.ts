import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-landing',
  template: `
    <div style="min-height: 100vh;">
      <app-navibar  [user]="user"></app-navibar>

      <ssm-header [user]="user"></ssm-header>

      <section>
        <!-- ======= Show Products ======= -->

        <div style="padding-bottom: 76px">
          <!--        <div class="row" style="padding-top: 3em">-->
          <ssm-products-by-categories-list></ssm-products-by-categories-list>
          <!--          <div class="col-lg-3 col-md-3">-->
          <!--            <ssm-category-list></ssm-category-list>-->
          <!--          </div>-->
          <!--          <div class="col-lg-9 col-md-9">-->
          <!--            <ssm-products-by-category></ssm-products-by-category>-->
          <!--          </div>-->
          <!--        </div>-->
        </div>

<!--        &lt;!&ndash; ======= Frequently Asked Questions Section ======= &ndash;&gt;-->
<!--        <section id="faq" class="faq section-bg">-->
<!--          <div class="container">-->
<!--            <div class="section-title">-->
<!--              <h2>Frequently Asked Questions</h2>-->
<!--            </div>-->

<!--            <div class="row  d-flex align-items-stretch">-->
<!--              <div class="col-lg-6 faq-item" data-aos="fade-up">-->
<!--                <h4>How long does exportation take?</h4>-->
<!--                <p>-->
<!--                  We provide our services East Africa and beyond. World wide,-->
<!--                  Anywhere and everywhere.-->
<!--                </p>-->
<!--              </div>-->

<!--              <div-->
<!--                class="col-lg-6 faq-item"-->
<!--                data-aos="fade-up"-->
<!--                data-aos-delay="100">-->
<!--                <h4>Do we charge delivery cost?</h4>-->
<!--                <p>Yes we charge delivery fee but on very affordable cost.</p>-->
<!--              </div>-->

<!--              <div-->
<!--                class="col-lg-6 faq-item"-->
<!--                data-aos="fade-up"-->
<!--                data-aos-delay="200"-->
<!--              >-->
<!--                <h4>Do we offer compensation?</h4>-->
<!--                <p>-->
<!--                  We do offer compensation for goods, please read our terms and-->
<!--                  conditions.-->
<!--                </p>-->
<!--              </div>-->

<!--              <div-->
<!--                class="col-lg-6 faq-item"-->
<!--                data-aos="fade-up"-->
<!--                data-aos-delay="300"-->
<!--              >-->
<!--                <h4>How long does it take to recieve an order?</h4>-->
<!--                <p>-->
<!--                  It takes one day to recieve an order anywhere around Dar es-->
<!--                  salaam. A minimum of Two days for those who reside outside of-->
<!--                  Dar es salaam region.-->
<!--                </p>-->
<!--              </div>-->
<!--              <div-->
<!--                class="col-lg-6 faq-item"-->
<!--                data-aos="fade-up"-->
<!--                data-aos-delay="400"-->
<!--              >-->
<!--                <h4>Do we work throughout the week?</h4>-->
<!--                <p>-->
<!--                  Yes indeed we do. We work everyday throughout the week, from-->
<!--                  Monday to Monday.-->
<!--                </p>-->
<!--              </div>-->
<!--              <div-->
<!--                class="col-lg-6 faq-item"-->
<!--                data-aos="fade-up"-->
<!--                data-aos-delay="500"-->
<!--              >-->
<!--                <h4>Do we do business beyond Tanzania?</h4>-->
<!--                <p>-->
<!--                  We warmly encourage anyone from and outside Tanzania to contact-->
<!--                  us in demand of our services.-->
<!--                </p>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </section>-->
<!--        &lt;!&ndash; End Frequently Asked Questions Section &ndash;&gt;-->

        <!--      &lt;!&ndash; ======= Contact Us Section ======= &ndash;&gt;-->
        <!--      <section id="contact" class="contact">-->
        <!--        <div class="container">-->
        <!--          <div class="section-title">-->
        <!--            <h2>Contact Us</h2>-->
        <!--          </div>-->

        <!--          <div class="row">-->
        <!--            <div class="col-lg-3 d-flex align-items-stretch" data-aos="fade-up">-->
        <!--              <div class="info-box">-->
        <!--                <i class="bx bx-map"></i>-->
        <!--                <h3>Our Address</h3>-->
        <!--                <p>Mbeya, Tanzania</p>-->
        <!--              </div>-->
        <!--            </div>-->

        <!--            <div-->
        <!--              class="col-lg-6 d-flex align-items-stretch"-->
        <!--              data-aos="fade-up"-->
        <!--              data-aos-delay="100">-->
        <!--              <div class="info-box">-->
        <!--                <i class="bx bx-envelope"></i>-->
        <!--                <h3>Email Us</h3>-->
        <!--                <p>{{user.email}}<br/></p>-->
        <!--              </div>-->
        <!--            </div>-->

        <!--            <div-->
        <!--              class="col-lg-3 d-flex align-items-stretch"-->
        <!--              data-aos="fade-up"-->
        <!--              data-aos-delay="200">-->
        <!--              <div class="info-box ">-->
        <!--                <i class="bx bx-phone-call"></i>-->
        <!--                <h3>Call Us</h3>-->
        <!--                <p>+{{user.mobile}}</p>-->
        <!--              </div>-->
        <!--            </div>-->

        <!--            <div class="col-lg-12" data-aos="fade-up" data-aos-delay="300">-->
        <!--              <form-->
        <!--                action=""-->
        <!--                method="post"-->
        <!--                role="form"-->
        <!--                class="php-email-form">-->
        <!--                <div class="form-row">-->
        <!--                  <div class="col-lg-6 form-group">-->
        <!--                    <input-->
        <!--                      type="text"-->
        <!--                      name="name"-->
        <!--                      class="form-control"-->
        <!--                      id="name"-->
        <!--                      placeholder="Your Name"-->
        <!--                      data-rule="minlen:4"-->
        <!--                      data-msg="Please enter at least 4 chars"/>-->
        <!--                    <div class="validate"></div>-->
        <!--                  </div>-->
        <!--                  <div class="col-lg-6 form-group">-->
        <!--                    <input-->
        <!--                      type="email"-->
        <!--                      class="form-control"-->
        <!--                      name="email"-->
        <!--                      id="email"-->
        <!--                      placeholder="Your Email"-->
        <!--                      data-rule="email"-->
        <!--                      data-msg="Please enter a valid email"/>-->
        <!--                    <div class="validate"></div>-->
        <!--                  </div>-->
        <!--                </div>-->
        <!--                <div class="form-group">-->
        <!--                  <input-->
        <!--                    type="text"-->
        <!--                    class="form-control"-->
        <!--                    name="subject"-->
        <!--                    id="subject"-->
        <!--                    placeholder="Subject"-->
        <!--                    data-rule="minlen:4"-->
        <!--                    data-msg="Please enter at least 8 chars of subject"/>-->
        <!--                  <div class="validate"></div>-->
        <!--                </div>-->
        <!--                <div class="form-group">-->
        <!--                  <textarea-->
        <!--                    class="form-control"-->
        <!--                    name="message"-->
        <!--                    rows="5"-->
        <!--                    data-rule="required"-->
        <!--                    data-msg="Please write something for us"-->
        <!--                    placeholder="Message"></textarea>-->
        <!--                  <div class="validate"></div>-->
        <!--                </div>-->
        <!--                <div class="mb-3">-->
        <!--                  <div class="loading">Loading</div>-->
        <!--                  <div class="error-message"></div>-->
        <!--                  <div class="sent-message">-->
        <!--                    Your message has been sent. Thank you!-->
        <!--                  </div>-->
        <!--                </div>-->
        <!--                <div class="text-center">-->
        <!--                  <button type="submit">Send Message</button>-->
        <!--                </div>-->
        <!--              </form>-->
        <!--            </div>-->
        <!--            -->
        <!--          </div>-->
        <!--        </div>-->
        <!--      </section>-->
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
