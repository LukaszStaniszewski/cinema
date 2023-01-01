import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { DropdownModule } from "src/app/shared";

import {
  CinemaRoomComponent,
  ReservationPageComponent,
  SummaryComponent,
  TicketDetailsComponent,
} from ".";
import { TicketComponent } from "./ticket/ticket.component";
import { TicketListComponent } from "./ticket-list/ticket-list.component";

const routes: Routes = [
  {
    path: "reservation/:id",
    component: ReservationPageComponent,
    title: "Reservation Page",
  },
];

@NgModule({
  declarations: [
    CinemaRoomComponent,
    SummaryComponent,
    TicketDetailsComponent,
    ReservationPageComponent,
    TicketListComponent,
    TicketComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    DropdownModule,
  ],
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
export class ReservationModule {}
