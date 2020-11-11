import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-landing',
  template: `
    <app-navibar></app-navibar>
<!-- 
    <div class="sm-carasoul" style=" background-image: url('assets/img/landing.jpg'); "> -->
      
    <!-- </div> -->
    <!-- ======= Hero Section ======= -->
    <section id="hero" style="height: 60vh">
      <div class="hero-container">
        <div
          id="heroCarousel"
          class="carousel slide carousel-fade"
          data-ride="carousel">
          <ol class="carousel-indicators" id="hero-carousel-indicators"></ol>

          <div class="carousel-inner" role="listbox">
            <!-- Slide 1 -->
           <div
              class="carousel-item active"
              style="background-image: url('assets/img/bg_icare.jpeg');">
              <div class="carousel-container" style="height: 60vh">
                <div class="carousel-content container">
                  <h2 class="animate__animated animate__fadeInDown">
                    Welcome to <span>ICare Technologies</span>
                  </h2>
                  <p class="animate__animated animate__fadeInUp"></p>
                  <h2>About Us</h2>
                  <p>
                    We fulfill all your needs for electronic gadgets and all
                    kinds of electronic products you need and use for your
                    everyday life and work.
                  </p>
                </div>
              </div>
            </div>
          </div> 
          <!--          <a class="carousel-control-prev" href="#heroCarousel" role="button" data-slide="prev">-->
          <!--            <span class="carousel-control-prev-icon icofont-rounded-left" aria-hidden="true"></span>-->
          <!--            <span class="sr-only">Previous</span>-->
          <!--          </a>-->
          <!--          <a class="carousel-control-next" href="#heroCarousel" role="button" data-slide="next">-->
          <!--            <span class="carousel-control-next-icon icofont-rounded-right" aria-hidden="true"></span>-->
          <!--            <span class="sr-only">Next</span>-->
          <!--          </a>-->
         </div>
      </div>
    </section> 
    <!-- End Hero -->

    <main id="main" style="padding-top: 2%">
      <!-- ======= Show Products ======= -->

      <div class="row" style="padding-top: 3em">
          <div class="col-lg-3 col-md-3">
            <ssm-category-list ></ssm-category-list>
          </div>
          <div class="col-lg-9 col-md-9">
            <ssm-products-by-category></ssm-products-by-category>
          </div>
      </div>
      

      <!-- ======= Frequently Asked Questions Section ======= -->
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
              data-aos-delay="100"
            >
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
      <!-- End Frequently Asked Questions Section -->

      <!-- ======= Contact Us Section ======= -->
      <section id="contact" class="contact">
        <div class="container">
          <div class="section-title">
            <h2>Contact Us</h2>
          </div>

          <div class="row">
            <div class="col-lg-3 d-flex align-items-stretch" data-aos="fade-up">
              <div class="info-box">
                <i class="bx bx-map"></i>
                <h3>Our Address</h3>
                <p>Mbeya, Tanzania</p>
              </div>
            </div>

            <div
              class="col-lg-6 d-flex align-items-stretch"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div class="info-box">
                <i class="bx bx-envelope"></i>
                <h3>Email Us</h3>
                <p>icaretechnologymbeyatz@gmail.com<br /></p>
              </div>
            </div>

            <div
              class="col-lg-3 d-flex align-items-stretch"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div class="info-box ">
                <i class="bx bx-phone-call"></i>
                <h3>Call Us</h3>
                <p>+255764161868</p>
              </div>
            </div>

            <div class="col-lg-12" data-aos="fade-up" data-aos-delay="300">
              <form
                action="forms/contact.php"
                method="post"
                role="form"
                class="php-email-form"
              >
                <div class="form-row">
                  <div class="col-lg-6 form-group">
                    <input
                      type="text"
                      name="name"
                      class="form-control"
                      id="name"
                      placeholder="Your Name"
                      data-rule="minlen:4"
                      data-msg="Please enter at least 4 chars"
                    />
                    <div class="validate"></div>
                  </div>
                  <div class="col-lg-6 form-group">
                    <input
                      type="email"
                      class="form-control"
                      name="email"
                      id="email"
                      placeholder="Your Email"
                      data-rule="email"
                      data-msg="Please enter a valid email"
                    />
                    <div class="validate"></div>
                  </div>
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    name="subject"
                    id="subject"
                    placeholder="Subject"
                    data-rule="minlen:4"
                    data-msg="Please enter at least 8 chars of subject"
                  />
                  <div class="validate"></div>
                </div>
                <div class="form-group">
                  <textarea
                    class="form-control"
                    name="message"
                    rows="5"
                    data-rule="required"
                    data-msg="Please write something for us"
                    placeholder="Message"
                  ></textarea>
                  <div class="validate"></div>
                </div>
                <div class="mb-3">
                  <div class="loading">Loading</div>
                  <div class="error-message"></div>
                  <div class="sent-message">
                    Your message has been sent. Thank you!
                  </div>
                </div>
                <div class="text-center">
                  <button type="submit">Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <!-- End Contact Us Section -->
    </main>
    <!-- End #main -->
    <app-cart-preview></app-cart-preview>
    <app-footer></app-footer>
  `,
  styleUrls: ['../styles/landingpage.css'],
})
export class LandingPageComponent implements OnInit {
  

  constructor() {}

  ngOnInit(): void {
   
  }
}
