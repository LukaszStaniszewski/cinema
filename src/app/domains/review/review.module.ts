import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";

import { TicketPurchasePageComponent } from "./ticket-purchase-page.component";

const routes: Routes = [
  {
    path: "",
    component: TicketPurchasePageComponent,
    title: "Purchase Page",
  },
];

@NgModule({
  declarations: [TicketPurchasePageComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export default class ReviewModule {}