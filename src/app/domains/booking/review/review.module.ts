import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import {} from "@angular/material/";
import { MatDialogModule } from "@angular/material/dialog";
import { RouterModule, Routes } from "@angular/router";

import { BlikDialogComponent, FilterOutStringsDirective, TicketPurchasePageComponent } from ".";

const routes: Routes = [
  {
    path: ":id",
    component: TicketPurchasePageComponent,
    title: "Purchase Page",
  },
];

@NgModule({
  declarations: [TicketPurchasePageComponent, BlikDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatDialogModule,
    FilterOutStringsDirective,
  ],
})
export default class ReviewModule {}
