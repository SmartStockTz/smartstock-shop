import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {BFast} from 'bfastjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {environment} from '../environments/environment';
import * as _firebase from 'firebase/app';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {ConfigService} from '../../../shop/src/public-api';

const firebase = _firebase.default;

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../../../shop/src/public-api').then((value) => value.ShopCoreModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('../../../shop/src/public-api').then((value) => value.ShopCoreModule),
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
  constructor(private readonly config: ConfigService) {

    // initialize firebase for auth to walk
    firebase.initializeApp(environment.firebase);

    // set active shop configurations
    config.shopDetails.next({
      masterKey: environment.masterKey,
      projectId: environment.projectId,
      applicationId: environment.applicationId
    });

    // initiate main smartstock project
    BFast.init({
      applicationId: 'smartstock_lb',
      projectId: 'smartstock',
    }, 'smartstock');

    // listen for auth state changes and update local user
    firebase.auth().onAuthStateChanged((a) => {
      if (!a) {
        BFast.auth().setCurrentUser(null).catch();
      }
    });
  }
}
