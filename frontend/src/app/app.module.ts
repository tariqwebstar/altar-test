import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PaymentsComponent } from "./pages/payments/payments.component";
import { GridComponent } from "./pages/grid/grid.component";
import { CodeDisplayComponent } from "./components/code-display/code-display.component";

@NgModule({
  declarations: [
    AppComponent,
    PaymentsComponent,
    GridComponent,
    CodeDisplayComponent,
    CodeDisplayComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
