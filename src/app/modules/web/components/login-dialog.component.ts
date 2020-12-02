import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-dialog',
  template: `
    <div>
      <p>Please login to continue</p>
      <button [disabled]="isLogin"
              (click)="loginWithGoogle()"
              style="height: 40px; font-size: 20px"
              mat-flat-button color="primary">
        LOGIN WITH GOOGLE
      </button>
      <div style="margin: 10px"></div>
      <!--      <button mat-dialog-close mat-button style="height: 40px; font-size: 20px">-->
      <!--        CANCEL-->
      <!--      </button>-->
    </div>
  `
})

export class LoginDialogComponent {
  isLogin = false;

  constructor(private dialogRef: MatDialogRef<LoginDialogComponent>,
              private readonly snack: MatSnackBar,
              private readonly userService: UserService) {
  }

  loginWithGoogle(): void {
    this.isLogin = true;
    this.userService.loginWithGoogle().then(value => {
      this.dialogRef.close(value);
    }).catch(reason => {
      console.log(reason);
      this.snack.open(reason && reason.message ? reason.message : reason.toString(), 'Ok', {
        duration: 2000
      });
    }).finally(() => {
      this.isLogin = false;
    });
  }
}
