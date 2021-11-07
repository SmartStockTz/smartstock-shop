# SmartStock-Shop-Core

Lib for e-commerce smartstock.

## Get Started

This is angular library install to your angular application from npm github `npm --save @smartstocktz/shop-core`

## Use It

In your application main module import `EcommerceModule` like following example.

```typescript
// ...
import {BFast} from 'bfastjs';
import {ShopConfigService} from '@smartstocktz/shop-core';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@smartstocktz/shop-core').then((value) => value.EcommerceModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('@smartstocktz/shop-core').then((value) => value.EcommerceModule),
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    //...
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private readonly config: ShopConfigService) {

    // initialize firebase for auth to walk
    firebase.initializeApp(environment.firebase);

    // set active shop configurations
    config.shopDetails.next({
      masterKey: environment.masterKey,
      projectId: environment.projectId,
      applicationId: environment.applicationId
    });

    // other initialization

    // listen for auth state changes and update local user
    firebase.auth().onAuthStateChanged((a) => {
      if (!a) {
        BFast.auth().setCurrentUser(null).catch();
      }
    });
  }
}

```

# Note

You can create a custom theme color to change color of application

