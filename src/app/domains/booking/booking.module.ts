import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ClickOutsideModule, DropdownModule } from "@shared/index";
import { ToastComponent } from "@shared/ui/toast/toast.component";

import { CinemaRoomStateService } from "./reservation";
import { TicketStateService } from "./reservation/shared/ticket.state.service";
import { BookingEffects } from "./reservation/store/booking.effects";
import { bookingReducer } from "./reservation/store/booking.reducer";
import { bookingFeatureKey } from "./reservation/store/booking.state";

const routes: Routes = [
  {
    path: "purchase",

    // loadChildren: () => import("./review/review.module"),
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
    DropdownModule,
    ClickOutsideModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    ReactiveFormsModule,

    ToastComponent,
    StoreModule.forFeature(bookingFeatureKey, bookingReducer),
    EffectsModule.forFeature(BookingEffects),
  ],
  providers: [CinemaRoomStateService, TicketStateService],
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
export default class BookingModule {}
