import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import {} from "@angular/material/";
import { MatDialogModule } from "@angular/material/dialog";
import { RouterModule, Routes } from "@angular/router";

import { PaymentComponent } from "./payment/payment.component";
import { TicketPurchasePageComponent } from "./ticket-purchase-page.component";

const routes: Routes = [
  {
    path: ":id",
    component: TicketPurchasePageComponent,
    title: "Purchase Page",
  },
];

@NgModule({
  declarations: [TicketPurchasePageComponent, PaymentComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes), MatDialogModule],
  // providers: [{ provide: OverleyConrainer }],
})
export default class ReviewModule {}
