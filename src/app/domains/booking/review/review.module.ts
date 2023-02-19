import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import {} from "@angular/material/";
import { MatDialogModule } from "@angular/material/dialog";
import { RouterModule, Routes } from "@angular/router";

import { BlikDialogComponent, TicketPurchasePageComponent } from ".";

const routes: Routes = [
  {
    path: ":id",
    component: TicketPurchasePageComponent,
    title: "Purchase Page",
  },
];

@NgModule({
  declarations: [TicketPurchasePageComponent, BlikDialogComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes), MatDialogModule],
})
export default class ReviewModule {}
