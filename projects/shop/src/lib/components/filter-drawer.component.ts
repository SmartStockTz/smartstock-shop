import { Component, OnInit } from "@angular/core";
import { UserService } from "smartstock-core";

@Component({
  selector: "app-shop-filters-drawer",
  template: `
    <div class="filter-drawer">
      <mat-toolbar class="filter-container">
        <span style="flex: 1 1 auto"></span>
        <button
          *ngIf="!isLogIn"
          routerLink="/account/login"
          mat-button
          color="primary"
          class="button"
        >
          Login
        </button>
        <button
          *ngIf="!isLogIn"
          routerLink="/account/register"
          mat-button
          color="primary"
          class="button"
        >
          Register
        </button>
      </mat-toolbar>
    </div>
  `,
  styleUrls: ["../styles/filter-drawer.style.scss"]
})
export class FilterDrawerComponent implements OnInit {
  isLogIn = true;

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.userService.currentUser().then((value) => {
      this.isLogIn = value && value.id;
    });
  }
}
