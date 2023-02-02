import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import { TicketStateService } from "./reservation/shared/ticket.state.service";
import { BookingEffects } from "./store/booking.effects";
import { bookingReducer } from "./store/booking.reducer";
import { bookingFeatureKey, BookingState } from "./store/booking.state";

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
/// czy dodanie typu AppState do app module sprawi ze booking module zostanie załadowany od razu (zamiast być lazy), bo aplikacja bedzie chciała zaimportować typ BookingState
export type AppState = {
  booking: BookingState;
};
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    StoreModule.forFeature(bookingFeatureKey, bookingReducer),
    EffectsModule.forFeature(BookingEffects),
  ],
  providers: [TicketStateService],
  // exports: [ReservationPageComponent],

  // providers: [
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: CustomHttpInterceptor,
  //     multi: true,
  //   },
  //   // {
  //   //   provide: APP_INITIALIZER,
  //   //   useValue: (userService: UserService) => {

  //   //   },
  //   //   deps: [UserService]
  //   // }
  // ],
})
export default class ReservationModule {}
