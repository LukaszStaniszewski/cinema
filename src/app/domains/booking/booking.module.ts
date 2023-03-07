import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { SpinnerComponent } from "@shared/ui/spinner/spinner.component";

import { CanActivateReview } from "./canActivateReview.guard";
import { InitialBookingApiService } from "./initial-booking-api.service";
import { CinemaRoomStateService, TicketStateService } from "./reservation";
import { ReviewStateService } from "./review";
import { BookingEffects, bookingFeatureKey, bookingReducer } from "./store";

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
  {
    path: "summary/:id",
    loadComponent: () => import("./payment-summary/payment-summary.component"),
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
    SpinnerComponent,
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
  constructor(private initialApiService: InitialBookingApiService) {
    this.initialApiService.load();
  }
}
