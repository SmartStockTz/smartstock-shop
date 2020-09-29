import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {BFast} from 'bfastjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';


const routes: Routes = [
  {path: '', loadChildren: () => import('./modules/web/web.module').then(value => value.WebModule)},
  {path: '**', loadChildren: () => import('./modules/web/web.module').then(value => value.WebModule)}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    BFast.init({
      applicationId: 'a1c5aa64-e7f2-4c9d-ac3b-c610bf01d652',
      projectId: '54de08e1-ed20-4c8f-9b48-c5cbb373a1a8'
    });
  }
}
