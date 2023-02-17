import { CommonModule, Location } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { Store, StoreModule } from "@ngrx/store";

import { CanActivateReview } from "./canActivateReview.guard";
import { InitialBookingApiService } from "./initial-booking-api.service";
import { CinemaRoomStateService, TicketStateService } from "./reservation";
import { ReviewStateService } from "./review/review.service";
import { BookingEffects, bookingFeatureKey, bookingReducer, selectTickets } from "./store";

const routes: Routes = [
  {
    path: "purchase",
    loadChildren: () => import("./review/review.module"),
    // canActivate: [CanActivateReview],
  },
  {
    path: "reservation",
    loadChildren: () => import("./reservation/reservation.module"),
  },
];
// /// czy dodanie typu AppState do app module sprawi ze booking module zostanie załadowany od razu (zamiast być lazy), bo aplikacja bedzie chciała zaimportować typ BookingState
// export type AppState = {
//   booking: BookingState;
// };
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(bookingFeatureKey, bookingReducer),
    EffectsModule.forFeature(BookingEffects),
  ],
  providers: [
    CinemaRoomStateService,
    TicketStateService,
    ReviewStateService,
    CanActivateReview,
    InitialBookingApiService,
  ],
})
export default class BookingModule {
  reservationId = "";

  constructor(
    private location: Location,
    private store: Store,
    private initialApiService: InitialBookingApiService
  ) {
    this.store.select(selectTickets).subscribe(console.log);

    this.location.onUrlChange(url => {
      const splitedUrl = url.split("/");
      const reservationId = splitedUrl[splitedUrl.length - 1];

      this.initialApiService.getReservationData(reservationId);
    });
  }
}
