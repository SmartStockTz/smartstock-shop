import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BFast } from 'bfastjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from '../environments/environment';
import * as firebase from 'firebase';
import { FirebaseAuthService } from './modules/web/services/firebase-auth.service';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/web/web.module').then((value) => value.WebModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./modules/web/web.module').then((value) => value.WebModule),
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatBottomSheetModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    firebase.initializeApp(environment.firebase);
    BFast.init({
      applicationId: 'yY9q5hy4xsbn',
      projectId: 'TfxGpMw6B4ku',
      appPassword: "eJrhALQqIv9UqjNqxrTYJDpp8EZYPOjGXk0RPUHT",
      adapters: {
        auth: () => new FirebaseAuthService(),
      },
    });
    firebase.auth().onAuthStateChanged((a) => {
      if (!a) {
        BFast.auth().setCurrentUser(null).catch();
      }
    });
  }
}
