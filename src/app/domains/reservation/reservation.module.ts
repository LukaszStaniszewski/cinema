import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DropdownModule } from "src/app/shared";

import {
  CinemaRoomComponent,
  CinemaRoomStateService,
  ReservationPageComponent,
  TicketComponent,
  TicketListComponent,
} from ".";

const routes: Routes = [
  {
    path: ":id",
    component: ReservationPageComponent,
    title: "Reservation Page",
  },
];

@NgModule({
  declarations: [
    CinemaRoomComponent,

    ReservationPageComponent,
    TicketListComponent,
    TicketComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    DropdownModule,
  ],
  // providers: [CinemaRoomStateService],
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