import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TicketPurchasePageComponent } from './ticket-purchase-page/ticket-purchase-page.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'purchase', component: TicketPurchasePageComponent },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
