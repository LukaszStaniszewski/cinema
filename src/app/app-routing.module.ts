import { inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Routes,
  RouterModule,
  CanActivateChildFn,
  Router,
} from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TicketPurchasePageComponent } from './ticket-purchase-page/ticket-purchase-page.component';
import { ReservationPageComponent } from './reservation-page/reservation-page.component';
import { of, tap } from 'rxjs';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// tylko angular 14+
const guard: CanActivateChildFn = () => {
  const router = inject(Router);

  return of(false).pipe(
    tap((canActivate) => {
      if (!canActivate) {
        //przekierowanie
        console.log('przekierowanie miala miejsce');
        router.navigate(['']);
      }
    })
  );
};

const routes: Routes = [
  { path: ':date', component: DashboardComponent, title: 'Home Page' },
  { path: '', component: DashboardComponent, title: 'Home Page' },
  {
    path: 'purchase',
    component: TicketPurchasePageComponent,
    title: 'Purchase Ticket Page',
  },
  // {
  //   path: 'reservation/:id/:time',
  //   component: ReservationPageComponent,
  //   title: 'Reservation Page',
  // },
  { path: '**', component: PageNotFoundComponent, title: 'Page Not Fount' },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
