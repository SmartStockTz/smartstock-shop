import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
      <footer id="footer" class="primary-bg-color">
          <div class="footer-top primary-bg-litter-color">
              <div class="container">
                  <div class="row">

                      <div class="col-lg-3 col-md-6 footer-info">
                          <h3>{{user?.businessName}}</h3>
                          <p>
                              <br>
                              {{user?.region}} - {{user?.country}}
                              <br><br>
                              <strong>Phone: {{user?.mobile}}</strong>
                              <br>
                              <strong>Email:</strong>{{user?.email}}<br>
                          </p>
                          <div class="social-links mt-3">
                              <a class="twitter primary-bg-color" target="_blank" href="{{user?.ecommerce?.social?.twitter}}"><i
                                      class="icofont-twitter"></i></a>
                              <a class="facebook primary-bg-color" target="_blank" href="{{user?.ecommerce?.social?.facebook}}"><i
                                      class="icofont-facebook"></i></a>
                              <a class="instagram primary-bg-color" target="_blank" href="{{user?.ecommerce?.social?.instagram}}"><i
                                      class="icofont-instagram"></i></a>
                              <a class="instagram primary-bg-color" target="_blank" href="https://wa.me/{{user?.mobile}}"><i
                                      class="icofont-whatsapp"></i></a>
                          </div>
                      </div>

                      <div class="col-lg-2 col-md-6 footer-links">
                          <h4>Useful Links</h4>
                          <ul>
                              <li class="active"><a href="/">Home</a></li>
                              <li><a>Services</a></li>
                              <li><a>Terms&conditions</a></li>
                          </ul>
                      </div>

                      <div class="col-lg-4 col-md-6 footer-newsletter">
                          <h4>Our Newsletter</h4>
                          <p style="color: white">Stay tuned for new updates on bonuses and best offers weekly</p>
                          <form>
                              <input type="email" name="email">
                              <input class="primary-bg-color" type="submit" value="Subscribe">
                          </form>
                      </div>

                  </div>
              </div>
          </div>

          <div class="container">
              <div class="copyright">
                  &copy; Copyright <strong><span>{{user?.businessName}}</span></strong>. All Rights Reserved
              </div>
              <div class="credits">
              </div>
          </div>
      </footer>

      <a class="back-to-top"><i class="icofont-simple-up"></i></a>
  `
})

export class FooterComponent {
  @Input() user: { [key: string]: any };
}
