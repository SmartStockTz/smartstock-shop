import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {LoginDialogComponent} from './login-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ConfigService} from '../services/config.service';

@Component({
  selector: 'app-navibar',
  template: `
    <!-- ======= Top Bar ======= -->
    <div class="mat-elevation-z2" style="position: sticky; top: 0; z-index: 100000000; background: white">
      <section id="topbar" class="">
        <div class="container clearfix d-flex flex-row">
          <div class="social-links">
            <a class="primary-color" href="{{user.ecommerce.social.twitter}}"><i class="icofont-twitter"></i></a>
            <a class="primary-color" href="{{user.ecommerce.social.facebook}}"><i class="icofont-facebook"></i></a>
            <a class="primary-color" target="_blank" href="{{user.ecommerce.social.instagram}}"><i
              class="icofont-instagram"></i></a>
            <a class="primary-color" target="_blank" [href]="'https://wa.me/'+user.mobile"><i class="icofont-whatsapp"></i></a>
          </div>
          <span style="flex: 1 1 auto"></span>
          <div class="contact-info">
            <i class="icofont-envelope primary-color"></i>
            <a href="mailto:{{user.email}}">{{user.email}}</a>
            <i class="icofont-phone primary-color">
              {{user.mobile}}
            </i>
          </div>
        </div>
      </section>

      <!-- ======= Header ======= -->
      <header>
        <div class="container">
          <div class="d-flex flex-row" style="width: 100%;">
            <div class="d-flex flex-row align-items-center">
              <img style="width: 50px; border-radius: 50px; height: 50px; margin: 2px 5px 2px 2px" src="{{user.ecommerce.logo}}" alt="">
              <h2 style="margin-top: 8px; margin-bottom: 0">
                <a routerLink="/shops/{{projectId}}">
                  <span>{{user.businessName}}</span>
                </a>
              </h2>
            </div>
            <span style="flex: 1 1 auto"></span>
            <nav class="nav-menu d-none d-lg-block">
              <ul class="d-flex flex-row align-items-center">
                <li><a routerLink="/shops/{{projectId}}"><span>Home</span></a></li>
                <li><a routerLink="/shops/{{projectId}}/products"><span>Shopping</span></a></li>
                <li *ngIf="username" style="padding: 8px">
                  <button style="padding: 8px; display: flex; justify-content: center; align-items: center"
                          [matMenuTriggerFor]="menu" mat-button color="primary">
                    <mat-icon>person</mat-icon>
                    <span>{{username}}</span>
                    <mat-icon>arrow_drop_down</mat-icon>
                  </button>
                  <mat-menu #menu>
                    <button routerLink="/shops/{{projectId}}/orders" mat-menu-item>My Orders</button>
                    <button routerLink="/shops/{{projectId}}/products" mat-menu-item>Shopping</button>
                    <button mat-menu-item (click)="logOut()">Logout</button>
                  </mat-menu>
                </li>
                <li *ngIf="username===null" style="padding: 8px">
                  <button (click)="login()" style="padding: 8px; display: flex; justify-content: center; align-items: center"
                          color="primary"
                          mat-button>
                    <span>LOGIN</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </div>
  `
})
export class NavbarComponent implements OnInit {
  constructor(private readonly userService: UserService,
              private readonly config: ConfigService,
              private readonly dialog: MatDialog) {
    this.projectId = this.config.shopDetails.value.projectId;
  }


  @Input() user: { [key: string]: any } = {businessName: ''};

  username = undefined;
  projectId: any;

  ngOnInit(): void {
    this.userService.isLoggedIn().then(value => {
      if (value) {
        this.username = value.displayName;
      } else {
        this.username = null;
      }
    }).catch(_ => {
      this.username = null;
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
