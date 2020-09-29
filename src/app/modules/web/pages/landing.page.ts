import {Component, OnInit} from '@angular/core';
import {ProductModel} from '../models/product.model';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-landing',
  template: `
    <app-navibar></app-navibar>

    <!-- ======= Hero Section ======= -->
    <section id="hero" style="height: 60vh">
      <div class="hero-container">
        <div id="heroCarousel" class="carousel slide carousel-fade" data-ride="carousel">

          <ol class="carousel-indicators" id="hero-carousel-indicators"></ol>

          <div class="carousel-inner" role="listbox">

            <!-- Slide 1 -->
            <div class="carousel-item active" style="background-image: url('assets/img/slide/slide-1.jpg');">
              <div class="carousel-container" style="height: 60vh">
                <div class="carousel-content container">
                  <h2 class="animate__animated animate__fadeInDown">Welcome to <span>MamaGenge</span></h2>
                  <p class="animate__animated animate__fadeInUp">We are here to support you on making purchases of best
                    quality of agricultural products.Marketting agricultural products has never been this easier.</p>
                  <a href="#about" class="btn-get-started animate__animated animate__fadeInUp scrollto">Read More</a>
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
    </section><!-- End Hero -->

    <main id="main">

      <!-- ======= Show Products ======= -->

      <div class="container">
        <h1 style="margin-top: 24px">Our Product</h1>
        <div *ngIf="!products || products.length === 0">
          <div class="row">
            <div *ngFor="let i of [1,2,3,4,5,6,7,8]"
                 class="col-xl-3 col-lg-3 col-sm-12 col-md-4">
              <div style="height: 200px; background: #f5f5f5; margin: 5px 0">
              </div>
            </div>
          </div>
        </div>
        <app-products-list [products]="products"></app-products-list>
        <div style="padding: 8px; display: flex;">
          <span style="flex: 1 1 auto"></span>
          <button class="btn btn-primary" routerLink="/products">
<!--            <a href="/products">-->
              See More Products >>>
<!--            </a>-->
          </button>
        </div>
      </div>

      <!-- ======= About Us Section ======= -->
      <section id="about" class="about">
        <div class="container">

          <div class="row no-gutters">
            <div class="col-lg-6 video-box">
              <img src="assets/img/about.jpg" class="img-fluid" alt="">
              <a href="https://www.youtube.com/watch?v=K6TJetHdDAw" class="venobox play-btn mb-4" data-vbtype="video"
                 data-autoplay="true"></a>
            </div>

            <div class="col-lg-6 d-flex flex-column justify-content-center about-content">

              <div class="section-title">
                <h2>About Us</h2>
                <p>We are a young growing company ready to feed the riches of Tanzania to the whole world. We buy
                  agricultural products from our local farmers and meet the demand of our royal customers. We sell high
                  quality agricultural products with the most affordable pric. easy to use, access, reliable with quick
                  response to its customers.

                </p>
              </div>

              <div class="icon-box" data-aos="fade-up" data-aos-delay="100">
                <div class="icon"><i class="bx bx-gift"></i></div>
                <h4 class="title"><a href="">BONUS</a></h4>
                <p class="description"> Buy one get one for free First month membership </p>
              </div>

            </div>
          </div>

        </div>
      </section><!-- End About Us Section -->

      <!-- ======= Counts Section ======= -->


      <!-- ======= Services Section ======= -->
      <section id="services" class="services">
        <div class="container">

          <div class="section-title">
            <h2>Services</h2>
          </div>

          <div class="row">
            <div class="col-lg-4 col-md-6 icon-box" data-aos="fade-up">
              <div class="icon"><i class="icofont-computer"></i></div>
              <h4 class="title"><a href="">Accesibility</a></h4>
              <p class="description">Services at the palm of your hand.<br> You only need internet connection</p>
            </div>
            <div class="col-lg-4 col-md-6 icon-box" data-aos="fade-up" data-aos-delay="100">
              <div class="icon"><i class="icofont-chart-bar-graph"></i></div>
              <h4 class="title"><a href="">Analysis</a></h4>
              <p class="description">We make an analysis on the flactuation of prices and update on prices</p>
            </div>
            <div class="col-lg-4 col-md-6 icon-box" data-aos="fade-up" data-aos-delay="200">
              <div class="icon"><i class="icofont-earth"></i></div>
              <h4 class="title"><a href="">Availability</a></h4>
              <p class="description">We sell anywhere and everywhere aroud the world</p>
            </div>

          </div>

        </div>
      </section><!-- End Services Section -->

      <!--      &lt;!&ndash; ======= Our Portfolio Section ======= &ndash;&gt;-->
      <!--      <section id="portfolio" class="portfolio section-bg">-->
      <!--        <div class="container" data-aos="fade-up" data-aos-delay="100">-->

      <!--          <div class="section-title">-->
      <!--            <h2>Our Portfolio</h2>-->
      <!--            <p>We are here to strengthen the agricultural sector by expanding the market for green products to the world.-->
      <!--              Eradication of poverty and creating a generation of rich agriculturalists is our top priority.</p>-->
      <!--          </div>-->

      <!--          <div class="row">-->
      <!--            <div class="col-lg-12">-->
      <!--              <ul id="portfolio-flters">-->
      <!--                <li data-filter="*" class="filter-active">All</li>-->
      <!--                <li data-filter=".filter-app">01</li>-->
      <!--                <li data-filter=".filter-card">02</li>-->
      <!--                <li data-filter=".filter-web">03</li>-->
      <!--              </ul>-->
      <!--            </div>-->
      <!--          </div>-->

      <!--          <div class="row portfolio-container">-->

      <!--            <div class="col-lg-4 col-md-6 portfolio-item filter-app">-->
      <!--              <div class="portfolio-wrap">-->
      <!--                <img src="assets/img/portfolio/portfolio-1.jpg" class="img-fluid" alt="">-->
      <!--                <div class="portfolio-info">-->
      <!--                  <h4>Tabora </h4>-->
      <!--                  <p>Marketting agricultural products has never been this easier</p>-->
      <!--                  <div class="portfolio-links">-->
      <!--                    <a href="assets/img/portfolio/portfolio-1.jpg" data-gall="portfolioGallery" class="venobox"-->
      <!--                       title="App 1"><i class="icofont-eye"></i></a>-->
      <!--                    <a href="portfolio-details.html" title="More Details"><i class="icofont-external-link"></i></a>-->
      <!--                  </div>-->
      <!--                </div>-->
      <!--              </div>-->
      <!--            </div>-->

      <!--            <div class="col-lg-4 col-md-6 portfolio-item filter-web">-->
      <!--              <div class="portfolio-wrap">-->
      <!--                <img src="assets/img/portfolio/portfolio-2.jpg" class="img-fluid" alt="">-->
      <!--                <div class="portfolio-info">-->
      <!--                  <h4>Arusha</h4>-->
      <!--                  <p>Eradication of poverty</p>-->
      <!--                  <div class="portfolio-links">-->
      <!--                    <a href="assets/img/portfolio/portfolio-2.jpg" data-gall="portfolioGallery" class="venobox"-->
      <!--                       title="Web 3"><i class="icofont-eye"></i></a>-->
      <!--                    <a href="portfolio-details.html" title="More Details"><i class="icofont-external-link"></i></a>-->
      <!--                  </div>-->
      <!--                </div>-->
      <!--              </div>-->
      <!--            </div>-->

      <!--            <div class="col-lg-4 col-md-6 portfolio-item filter-app">-->
      <!--              <div class="portfolio-wrap">-->
      <!--                <img src="assets/img/portfolio/portfolio-3.jpg" class="img-fluid" alt="">-->
      <!--                <div class="portfolio-info">-->
      <!--                  <h4>Meru</h4>-->
      <!--                  <p>Hope to bring smiles</p>-->
      <!--                  <div class="portfolio-links">-->
      <!--                    <a href="assets/img/portfolio/portfolio-3.jpg" data-gall="portfolioGallery" class="venobox"-->
      <!--                       title="App 2"><i class="icofont-eye"></i></a>-->
      <!--                    <a href="portfolio-details.html" title="More Details"><i class="icofont-external-link"></i></a>-->
      <!--                  </div>-->
      <!--                </div>-->
      <!--              </div>-->
      <!--            </div>-->

      <!--            <div class="col-lg-4 col-md-6 portfolio-item filter-card">-->
      <!--              <div class="portfolio-wrap">-->
      <!--                <img src="assets/img/portfolio/portfolio-4.jpg" class="img-fluid" alt="">-->
      <!--                <div class="portfolio-info">-->
      <!--                  <h4>Young boy</h4>-->
      <!--                  <p>Hope to bring smiles</p>-->
      <!--                  <div class="portfolio-links">-->
      <!--                    <a href="assets/img/portfolio/portfolio-4.jpg" data-gall="portfolioGallery" class="venobox"-->
      <!--                       title="Card 2"><i class="icofont-eye"></i></a>-->
      <!--                    <a href="portfolio-details.html" title="More Details"><i class="icofont-external-link"></i></a>-->
      <!--                  </div>-->
      <!--                </div>-->
      <!--              </div>-->
      <!--            </div>-->

      <!--            <div class="col-lg-4 col-md-6 portfolio-item filter-web">-->
      <!--              <div class="portfolio-wrap">-->
      <!--                <img src="assets/img/portfolio/portfolio-5.jpg" class="img-fluid" alt="">-->
      <!--                <div class="portfolio-info">-->
      <!--                  <h4>Kilimanjaro</h4>-->
      <!--                  <p>local farmer</p>-->
      <!--                  <div class="portfolio-links">-->
      <!--                    <a href="assets/img/portfolio/portfolio-5.jpg" data-gall="portfolioGallery" class="venobox"-->
      <!--                       title="Web 2"><i class="icofont-eye"></i></a>-->
      <!--                    <a href="portfolio-details.html" title="More Details"><i class="icofont-external-link"></i></a>-->
      <!--                  </div>-->
      <!--                </div>-->
      <!--              </div>-->
      <!--            </div>-->

      <!--            <div class="col-lg-4 col-md-6 portfolio-item filter-app">-->
      <!--              <div class="portfolio-wrap">-->
      <!--                <img src="assets/img/portfolio/portfolio-6.jpg" class="img-fluid" alt="">-->
      <!--                <div class="portfolio-info">-->
      <!--                  <h4>Iringa</h4>-->
      <!--                  <p>local farme</p>-->
      <!--                  <div class="portfolio-links">-->
      <!--                    <a href="assets/img/portfolio/portfolio-6.jpg" data-gall="portfolioGallery" class="venobox"-->
      <!--                       title="App 3"><i class="icofont-eye"></i></a>-->
      <!--                    <a href="portfolio-details.html" title="More Details"><i class="icofont-external-link"></i></a>-->
      <!--                  </div>-->
      <!--                </div>-->
      <!--              </div>-->
      <!--            </div>-->

      <!--            <div class="col-lg-4 col-md-6 portfolio-item filter-card">-->
      <!--              <div class="portfolio-wrap">-->
      <!--                <img src="assets/img/portfolio/portfolio-7.jpg" class="img-fluid" alt="">-->
      <!--                <div class="portfolio-info">-->
      <!--                  <h4>A lady from Tanga</h4>-->
      <!--                  <p>Hope to bring smiles</p>-->
      <!--                  <div class="portfolio-links">-->
      <!--                    <a href="assets/img/portfolio/portfolio-7.jpg" data-gall="portfolioGallery" class="venobox"-->
      <!--                       title="Card 1"><i class="icofont-eye"></i></a>-->
      <!--                    <a href="portfolio-details.html" title="More Details"><i class="icofont-external-link"></i></a>-->
      <!--                  </div>-->
      <!--                </div>-->
      <!--              </div>-->
      <!--            </div>-->

      <!--            <div class="col-lg-4 col-md-6 portfolio-item filter-card">-->
      <!--              <div class="portfolio-wrap">-->
      <!--                <img src="assets/img/portfolio/portfolio-8.jpg" class="img-fluid" alt="">-->
      <!--                <div class="portfolio-info">-->
      <!--                  <h4>Morogoro</h4>-->
      <!--                  <p>local farmer</p>-->
      <!--                  <div class="portfolio-links">-->
      <!--                    <a href="assets/img/portfolio/portfolio-8.jpg" data-gall="portfolioGallery" class="venobox"-->
      <!--                       title="Card 3"><i class="icofont-eye"></i></a>-->
      <!--                    <a href="portfolio-details.html" title="More Details"><i class="icofont-external-link"></i></a>-->
      <!--                  </div>-->
      <!--                </div>-->
      <!--              </div>-->
      <!--            </div>-->

      <!--            <div class="col-lg-4 col-md-6 portfolio-item filter-web">-->
      <!--              <div class="portfolio-wrap">-->
      <!--                <img src="assets/img/portfolio/portfolio-9.jpg" class="img-fluid" alt="">-->
      <!--                <div class="portfolio-info">-->
      <!--                  <h4>Ruvuma</h4>-->
      <!--                  <p>local farmer</p>-->
      <!--                  <div class="portfolio-links">-->
      <!--                    <a href="assets/img/portfolio/portfolio-9.jpg" data-gall="portfolioGallery" class="venobox"-->
      <!--                       title="Web 3"><i class="icofont-eye"></i></a>-->
      <!--                    <a href="portfolio-details.html" title="More Details"><i class="icofont-external-link"></i></a>-->
      <!--                  </div>-->
      <!--                </div>-->
      <!--              </div>-->
      <!--            </div>-->

      <!--          </div>-->

      <!--        </div>-->
      <!--      </section>&lt;!&ndash; End Our Portfolio Section &ndash;&gt;-->

      <!-- ======= Our Team Section ======= -->
      <section id="team" class="team">
        <div class="container">

          <div class="section-title">
            <h2>Our Team</h2>
            <p>Dedicated staff who will ensure you the best online experience on our online shopping mall</p>
          </div>

          <div class="row">

            <div class="col-xl-3 col-lg-4 col-md-6" data-aos="fade-up">
              <div class="member">
                <div class="pic"><img src="assets/img/team/team-1.jpg" class="img-fluid" alt=""></div>
                <div class="member-info">
                  <h4>Faith </h4>
                  <span>Chief Executive Officer</span>
                  <div class="social">
                    <a href="https://twitter.com/kingfaith360?s=08"><i class="icofont-twitter"></i></a>

                  </div>
                </div>
              </div>
            </div>

            <div class="col-xl-3 col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
              <div class="member">
                <div class="pic"><img src="assets/img/team/team-2.jpg" class="img-fluid" alt=""></div>
                <div class="member-info">
                  <h4>Deogratius Mutembei</h4>
                  <span>Product Manager</span>
                  <div class="social">

                    <a href="https://www.instagram.com/deobi_37/"><i class="icofont-instagram"></i></a>

                  </div>
                </div>
              </div>
            </div>

            <div class="col-xl-3 col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
              <div class="member">
                <div class="pic"><img src="assets/img/team/team-3.jpg" class="img-fluid" alt=""></div>
                <div class="member-info">
                  <h4>Hosiana Bryson</h4>
                  <span>Marketting manager</span>
                  <div class="social">
                    <a href="https://www.instagram.com/ms__sia/"><i class="icofont-instagram"></i></a>

                  </div>
                </div>
              </div>
            </div>

            <div class="col-xl-3 col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
              <div class="member">
                <div class="pic"><img src="assets/img/team/team-4.jpg" class="img-fluid" alt=""></div>
                <div class="member-info">
                  <h4>Jesca Msule</h4>
                  <span>Accountant</span>
                  <div class="social">

                    <a href=""><i class="icofont-facebook"></i></a>
                    <a href=""><i class="icofont-instagram"></i></a>

                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
              <div class="member">
                <div class="pic"><img src="assets/img/team/team-5.jpg" class="img-fluid" alt=""></div>
                <div class="member-info">
                  <h4>Blasto Chatanda</h4>
                  <span>Data Analyst</span>
                  <div class="social">
                    <a href="https://www.instagram.com/b.r.a.y_b/"><i class="icofont-instagram"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section><!-- End Our Team Section -->

      <!-- ======= Frequently Asked Questions Section ======= -->
      <section id="faq" class="faq section-bg">
        <div class="container">

          <div class="section-title">
            <h2>Frequently Asked Questions</h2>
          </div>

          <div class="row  d-flex align-items-stretch">

            <div class="col-lg-6 faq-item" data-aos="fade-up">
              <h4>Do we export?</h4>
              <p>
                Yes we provide our services East Africa and beyond. World wide, Anywhere and everywhere.
              </p>
            </div>

            <div class="col-lg-6 faq-item" data-aos="fade-up" data-aos-delay="100">
              <h4>Do we charge delivery cost?</h4>
              <p>
                Yes we charge delivery fee but on very affordable cost.
              </p>
            </div>

            <div class="col-lg-6 faq-item" data-aos="fade-up" data-aos-delay="200">
              <h4>Do we offer compensation?</h4>
              <p>
                We do offer compensation for goods, please read our terms and conditions.
              </p>
            </div>

            <div class="col-lg-6 faq-item" data-aos="fade-up" data-aos-delay="300">
              <h4>How long does it take to recieve an order?</h4>
              <p>
                It takes a minimum of six working days for oversee countries, and take less than two working days for East
                African countries.
              </p>
            </div>
          </div>
        </div>

      </section><!-- End Frequently Asked Questions Section -->

      <!-- ======= Contact Us Section ======= -->
      <section id="contact" class="contact">
        <div class="container">

          <div class="section-title">
            <h2>Contact Us</h2>
          </div>

          <div class="row">

            <div class="col-lg-6 d-flex align-items-stretch" data-aos="fade-up">
              <div class="info-box">
                <i class="bx bx-map"></i>
                <h3>Our Address</h3>
                <p>kijitonyama,Dar es salaam.Tz</p>
              </div>
            </div>

            <div class="col-lg-3 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="100">
              <div class="info-box">
                <i class="bx bx-envelope"></i>
                <h3>Email Us</h3>
                <p>info@mamagenge98.com<br>mamagenge98@gmail.com</p>
              </div>
            </div>

            <div class="col-lg-3 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="200">
              <div class="info-box ">
                <i class="bx bx-phone-call"></i>
                <h3>Call Us</h3>
                <p>+255737102447<br>+255676390012</p>
              </div>
            </div>

            <div class="col-lg-12" data-aos="fade-up" data-aos-delay="300">
              <form action="forms/contact.php" method="post" role="form" class="php-email-form">
                <div class="form-row">
                  <div class="col-lg-6 form-group">
                    <input type="text" name="name" class="form-control" id="name" placeholder="Your Name"
                           data-rule="minlen:4" data-msg="Please enter at least 4 chars"/>
                    <div class="validate"></div>
                  </div>
                  <div class="col-lg-6 form-group">
                    <input type="email" class="form-control" name="email" id="email" placeholder="Your Email"
                           data-rule="email" data-msg="Please enter a valid email"/>
                    <div class="validate"></div>
                  </div>
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject"
                         data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject"/>
                  <div class="validate"></div>
                </div>
                <div class="form-group">
              <textarea class="form-control" name="message" rows="5" data-rule="required"
                        data-msg="Please write something for us" placeholder="Message"></textarea>
                  <div class="validate"></div>
                </div>
                <div class="mb-3">
                  <div class="loading">Loading</div>
                  <div class="error-message"></div>
                  <div class="sent-message">Your message has been sent. Thank you!</div>
                </div>
                <div class="text-center">
                  <button type="submit">Send Message</button>
                </div>
              </form>
            </div>

          </div>

        </div>
      </section><!-- End Contact Us Section -->

    </main><!-- End #main -->
    <app-cart-preview></app-cart-preview>
    <app-footer></app-footer>
  `
})
export class LandingPageComponent implements OnInit {
  products: ProductModel[] = [];

  constructor(private readonly productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.getProducts({
      skip: 0,
      size: 8
    }).then(value => {
      this.products = value;
    }).catch(reason => {
      console.log(reason);
    });
  }
}
