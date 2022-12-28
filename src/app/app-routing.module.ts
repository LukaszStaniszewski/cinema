import { inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './domains/dashboard/dashboard.component';
import { TicketPurchasePageComponent } from './domains/review/ticket-purchase-page.component';

import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

import { ReservationPageComponent } from './domains/reservation';
import { ShellComponent } from './shell/shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        children: [
          {
            path: 'showings/:day',
            component: DashboardComponent,
            title: 'DashboardComponent',
          },
        ],
      },
      {
        path: 'purchase',
        component: TicketPurchasePageComponent,
        title: 'Purchase Ticket Page',
      },
      {
        path: 'reservation/:id',
        component: ReservationPageComponent,
        title: 'Reservation Page',
      },
    ],
  },
  { path: '**', component: PageNotFoundComponent, title: 'Page Not Found' },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
