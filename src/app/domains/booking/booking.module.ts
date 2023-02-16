import { CommonModule, Location } from "@angular/common";
import { NgModule } from "@angular/core";
import { ActivatedRoute, RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { Store, StoreModule } from "@ngrx/store";
import { distinctUntilChanged, map, of } from "rxjs";

import { CanActivateReview } from "./canActivateReview.guard";
import { CinemaRoomStateService, TicketStateService } from "./reservation";
import { ReservationService } from "./reservation/reservation.service";
import { ReviewStateService } from "./review/review.service";
import {
  BookingApiAtions,
  BookingEffects,
  bookingFeatureKey,
  bookingReducer,
  BookingTicketActions,
} from "./store";

const routes: Routes = [
  {
    path: "purchase",
    loadChildren: () => import("./review/review.module"),
    canActivate: [CanActivateReview],
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
  providers: [CinemaRoomStateService, TicketStateService, ReviewStateService, CanActivateReview],
})
export default class BookingModule {
  constructor(
    private cinemaRoom: CinemaRoomStateService,
    private ticketService: TicketStateService,
    private location: Location,
    private store: Store,
    private route: ActivatedRoute
  ) {
    const regex = new RegExp(/booking/i);
    this.location.onUrlChange(url => {
      if (regex.test(url)) {
        this.getShowingPartial(url);
      }
      if (!regex.test(url)) {
        this.resetStateOnLeaveCuzNgOnDestoryIsNotWorking();
      }
    });
  }

  private resetStateOnLeaveCuzNgOnDestoryIsNotWorking() {
    this.cinemaRoom.reset();
    this.ticketService.reset();
    this.store.dispatch(BookingTicketActions.resetState());
  }

  private getShowingPartial(reservationId: string) {
    of(reservationId)
      .pipe(
        map(url => url.split("/")),
        map(url => url[url.length - 1]),
        distinctUntilChanged()
      )
      .subscribe(params =>
        this.store.dispatch(BookingApiAtions.getShowingPartialStart({ payload: params }))
      );
  }
}
