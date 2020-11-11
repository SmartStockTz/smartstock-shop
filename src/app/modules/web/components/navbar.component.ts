import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {LoginDialogComponent} from './login-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-navibar',
  template: `
    <!-- ======= Top Bar ======= -->
    <section id="topbar" class="">
      <div class="container clearfix">
        <div class="contact-info float-left">
          <i class="icofont-envelope"></i><a href="mailto:contact@example.com">icaretechnologiestz@gmail.com</a>
          <i class="icofont-phone">+255764161868
          </i>
        </div>
        <div class="social-links float-right">
          <!-- <a class="twitter"><i class="icofont-twitter"></i></a>
          <a class="facebook"><i class="icofont-facebook"></i></a> -->
          <a class="instagram" href="https://www.instagram.com/icaretechnologytz/"><i class="icofont-instagram"></i></a>
        </div>

      </div>
    </section>

    <!-- ======= Header ======= -->
    <header id="header">
      <div class="container">

        <div class="logo float-left">
          <h1 class="text-light"><a routerLink="/"><span>ICare Technologies</span></a></h1>
          <!-- Uncomment below if you prefer to use an image logo -->
          <!-- <a ><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->
        </div>

        <nav class="nav-menu float-right d-none d-lg-block">
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
        </nav><!-- .nav-menu -->

      </div>
    </header><!-- End Header -->
  `
})
export class NavbarComponent implements OnInit {
  constructor(private readonly userService: UserService,
              private readonly dialog: MatDialog) {
  }

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
