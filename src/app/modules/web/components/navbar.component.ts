import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {LoginDialogComponent} from './login-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-navibar',
  template: `
    <!-- ======= Top Bar ======= -->
    <section id="topbar" class="">
      <div class="container clearfix d-flex flex-row">
        <div class="social-links">
          <a class="twitter" href="{{user.ecommerce.social.twitter}}"><i class="icofont-twitter"></i></a>
          <a class="facebook" href="{{user.ecommerce.social.facebook}}"><i class="icofont-facebook"></i></a>
          <a class="instagram" target="_blank" href="{{user.ecommerce.social.instagram}}"><i class="icofont-instagram"></i></a>
        </div>
        <span style="flex: 1 1 auto"></span>
        <div class="contact-info">
          <i class="icofont-envelope"></i><a href="mailto:contact@example.com">{{user.email}}</a>
          <i class="icofont-phone">{{user.mobile}}</i>
        </div>
      </div>
    </section>

    <!-- ======= Header ======= -->
    <header>
      <div class="container">
        <div class="d-flex flex-row" style="width: 100%;">
          <div class="d-flex flex-row align-items-center">
            <img style="width: 60px; margin: 2px 5px 2px 2px" src="{{user.ecommerce.logo}}" alt="">
            <h2 style="margin-top: 8px; margin-bottom: 0"><a routerLink="/"><span>{{user.businessName}}</span></a></h2>
          </div>
          <span style="flex: 1 1 auto"></span>
          <nav class="nav-menu d-none d-lg-block">
            <ul>
              <li><a routerLink="/">Home</a></li>
              <li><a href="/products">Shopping</a></li>
              <!--        <li><a href="#location">Location</a></li>-->
              <!--        <li><a href="#services">Services</a></li>-->
              <!--        <li><a href="#portfolio">Portfolio</a></li>-->
              <!--        <li><a href="#team">Team</a></li>-->

              <li *ngIf="username" style="padding: 8px">
                <button style="padding: 8px; display: flex; justify-content: center; align-items: center"
                        [matMenuTriggerFor]="menu" class="btn btn-outline-primary">
                  <mat-icon>person</mat-icon>
                  <span>{{username}}</span>
                </button>
                <mat-menu #menu>
                  <button routerLink="/orders" mat-menu-item>My Orders</button>
                  <button routerLink="/products" mat-menu-item>Shopping</button>
                  <button mat-menu-item (click)="logOut()">Logout</button>
                </mat-menu>
              </li>
              <li *ngIf="username===null" style="padding: 8px">
                <button (click)="login()" style="padding: 8px; display: flex; justify-content: center; align-items: center"
                        class="btn btn-outline-primary">
                  <span>LOGIN</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header><!-- End Header -->
  `
})
export class NavbarComponent implements OnInit {
  constructor(private readonly userService: UserService,
              private readonly dialog: MatDialog) {
  }


  @Input() user: { [key: string]: any } = {businessName: ''};

  username = undefined;

  ngOnInit(): void {
    this.userService.isLoggedIn().then(value => {
      if (value) {
        this.username = value.displayName;
      } else {
        this.username = null;
      }
    });
  }

  logOut(): void {
    this.userService.logOut().then(_ => {
      location.reload();
    });
  }

  login(): void {
    this.dialog.open(LoginDialogComponent, {})
      .afterClosed().subscribe(loggedUser => {
      if (loggedUser) {
        this.username = loggedUser.displayName;
      }
    });
  }

  orders(): void {

  }
}
