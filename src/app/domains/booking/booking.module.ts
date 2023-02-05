import { CommonModule, Location } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { Store, StoreModule } from "@ngrx/store";

import { CinemaRoomStateService, TicketStateService } from "./reservation";
import { ReviewStateService } from "./review/review.service";
import { BookingActions, BookingEffects, bookingFeatureKey, bookingReducer } from "./store";

const routes: Routes = [
  {
    path: "purchase",
    loadChildren: () => import("./review/review.module"),
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
  providers: [CinemaRoomStateService, TicketStateService, ReviewStateService],
})
export default class BookingModule {
  constructor(
    private cinemaRoom: CinemaRoomStateService,
    private ticketService: TicketStateService,
    private location: Location,
    private store: Store
  ) {
    const regex = new RegExp(/booking/i);
    this.location.onUrlChange(url => {
      if (!regex.test(url)) {
        this.resetStateOnLeaveCuzNgOnDestoryIsNotWorking();
      }
    });
  }

  private resetStateOnLeaveCuzNgOnDestoryIsNotWorking() {
    this.cinemaRoom.reset();
    this.ticketService.reset();
    this.store.dispatch(BookingActions.resetState());
  }
}
