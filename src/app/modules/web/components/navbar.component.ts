import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-navibar',
  templateUrl: '../templates/navbar.template.html'
})
export class NavbarComponent implements OnInit {
  constructor(private readonly userService: UserService) {
  }

  username = undefined;

  ngOnInit(): void {
    this.userService.isLoggedIn().then(value => {
      if (value) {
        this.username = value.displayName;
      }
    });
  }

  logOut(): void {
    this.userService.logOut().then(_ => {
      location.reload();
    });
  }
}
