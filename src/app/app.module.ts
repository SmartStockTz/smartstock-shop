import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';


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
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
