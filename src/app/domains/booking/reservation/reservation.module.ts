import { CommonModule, NgClass } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { DropdownModule } from "src/app/shared";

import {
  CinemaRoomComponent,
  CinemaRoomStateService,
  ReservationPageComponent,
  SummaryComponent,
} from ".";
import { TicketStateService } from "./shared/ticket.state.service";
import { BookingEffects } from "./store/booking.effects";
import { bookingReducer } from "./store/booking.reducer";
import { bookingFeatureKey, BookingState } from "./store/booking.state";

/// czy dodanie typu AppState do app module sprawi ze booking module zostanie załadowany od razu (zamiast być lazy), bo aplikacja bedzie chciała zaimportować typ BookingState
export type AppState = {
  booking: BookingState;
};

const routes: Routes = [
  {
    path: ":id",
    component: ReservationPageComponent,
    title: "Reservation Page",
  },
];

@NgModule({
  declarations: [CinemaRoomComponent, SummaryComponent, ReservationPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    DropdownModule,
    // StoreModule.forFeature(bookingFeatureKey, bookingReducer),
    // EffectsModule.forFeature(BookingEffects),
  ],

  providers: [],
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
