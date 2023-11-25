import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PaymentsComponent } from "./pages/payments/payments.component";
import { GridComponent } from "./pages/grid/grid.component";

const routes: Routes = [
  { path: "grid", component: GridComponent },
  { path: "payments", component: PaymentsComponent },
  { path: "", redirectTo: "/grid", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
