import { inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Routes,
  RouterModule,
  CanActivateChildFn,
  Router,
} from '@angular/router';
import { DashboardComponent } from './domains/dashboard/dashboard.component';
import { TicketPurchasePageComponent } from './domains/review/ticket-purchase-page.component';

import { map, of, tap } from 'rxjs';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { ShowingStateService } from './domains/dashboard';
import {
  CinemaRoomService,
  ReservationPageComponent,
} from './domains/reservation';
import { ShellComponent } from './shell/shell.component';

// tylko angular 14+
// const guard: CanActivateChildFn = () => {
//   const router = inject(Router);
//   // const showings = inject(CinemaRoomService);
//   const cinemaRoom = inject(CinemaRoomService);

//   // return of(false).pipe(
//   //   tap((canActivate) => {
//   //     if (!canActivate) {
//   //       //przekierowanie
//   //       console.log('przekierowanie miala miejsce');
//   //       router.navigate(['']);
//   //     }
//   //   })
//   // );
//   // let cinemaRoom1 = false;
//   // showings.cinemaRoom$.subscribe((cinemaRoom) => {
//   //   cinemaRoom1 = !!cinemaRoom;
//   // });

//   // return of(cinemaRoom1).pipe(
//   //   tap((canActivate) => {
//   //     if (!canActivate) {
//   //       console.log('przekierowanie miala miejsce');

//   //       router.navigate(['']);
//   //     }
//   //   })
//   // );
//   return cinemaRoom.cinemaRoom$.pipe(
//     tap((authState) => {
//       console.log(!!authState);
//       if (!authState) {
//         router.navigate(['']);
//       }

//       // authService.handleNonAuthState();
//     }),
//     map((authState) => !!authState)
//   );
// };

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
