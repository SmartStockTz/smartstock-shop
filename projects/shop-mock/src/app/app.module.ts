import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { RouterModule, Routes } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { init } from "bfast";
import { CommonModule } from "@angular/common";
import { IndexPage } from "./pages/index.page";
import { MatDialogModule } from "@angular/material/dialog";
import { MallState } from "../../../shop/src/public-api";
import { HttpClientModule } from "@angular/common/http";
import { SmartstockHttpAdapter } from "smartstock-core";
import { environment } from "../environments/environment";

const routes: Routes = [
  {
    path: "",
    component: IndexPage
  },
  {
    path: "account",
    loadChildren: () =>
      import("smartstock-accounts").then((value) => value.AccountModule)
  },
  {
    path: "shops/:id",
    loadChildren: () =>
      import("../../../shop/src/public-api").then(
        (value) => value.EcommerceModule
      )
  }
];

@NgModule({
  declarations: [AppComponent, IndexPage],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatSnackBarModule,
    MatBottomSheetModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private readonly mallState: MallState,
    private readonly smartstockHttp: SmartstockHttpAdapter
  ) {
    mallState.shop.next({
      uid: "65e8396a-564c-40d5-8c79-d4e48b23edb5",
      shop: {
        businessName: "SmartStock",
        country: "Tanzania",
        settings: {
          currency: "Tsh"
        },
        applicationId: "ffc5ea2c-bd2a-42c9-b3c5-3901a445973e",
        region: "Dar Es Salaam",
        ecommerce: {
          cover:
            "https://180841b4-fc74-4609-bce8-48c130947252-daas.bfast.fahamutech.com/storage/ffc5ea2c-bd2a-42c9-b3c5-3901a445973e/file/00469123-80c2-414f-9b8d-f49fe85f4e7c-Picture2.png",
          logo:
            "https://smartstock-faas.bfast.fahamutech.com/shop/180841b4-fc74-4609-bce8-48c130947252/ffc5ea2c-bd2a-42c9-b3c5-3901a445973e/v2/storage/ffc5ea2c-bd2a-42c9-b3c5-3901a445973e/file/eaffb306-27fa-4ea1-a0e1-c5dc78abe183",
          about: "SmartStock default shop for test and demonstrations."
        },
        projectId: "180841b4-fc74-4609-bce8-48c130947252"
      }
    });
    init({
      applicationId: "smartstock_lb",
      projectId: "smartstock",
      databaseURL: environment.baseDaaSUrl,
      functionsURL: environment.baseFaaSUrl,
      adapters: {
        http: (_8) => this.smartstockHttp
      }
    });
  }
}
