import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {BFast} from 'bfastjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {environment} from '../environments/environment';
import * as _firebase from 'firebase/app';
import {FirebaseAuthService} from './modules/web/services/firebase-auth.service';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';

const firebase = _firebase.default;

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
    RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'}),
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
      applicationId: environment.applicationId,
      projectId: environment.projectId,
      appPassword: environment.masterKey,
      adapters: {
        auth: () => new FirebaseAuthService(),
      },
    });

    BFast.init({
      applicationId: 'smartstock_lb',
      projectId: 'smartstock',
    }, 'smartstock');

    firebase.auth().onAuthStateChanged((a) => {
      if (!a) {
        BFast.auth().setCurrentUser(null).catch();
      }
    });
  }
}
