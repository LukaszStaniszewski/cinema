import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { TicketPurchasePageComponent } from './ticket-purchase-page.component';

const routes: Routes = [
  {
    path: 'purchase',
    component: TicketPurchasePageComponent,
    title: 'Purchase Page',
  },
];

@NgModule({
  declarations: [TicketPurchasePageComponent],
  imports: [BrowserModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class ReviewModule {}
