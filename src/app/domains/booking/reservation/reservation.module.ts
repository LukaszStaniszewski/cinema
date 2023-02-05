import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DropdownModule } from "@shared/index";

import { BookingState } from "../store";
import { CinemaRoomComponent, ReservationComponent, SummaryComponent } from ".";

/// czy dodanie typu AppState do app module sprawi ze booking module zostanie załadowany od razu (zamiast być lazy), bo aplikacja bedzie chciała zaimportować typ BookingState
export type AppState = {
  booking: BookingState;
};

const routes: Routes = [
  {
    path: ":id",
    component: ReservationComponent,
    title: "Reservation Page",
  },
];

@NgModule({
  declarations: [CinemaRoomComponent, SummaryComponent, ReservationComponent],
  imports: [CommonModule, RouterModule.forChild(routes), DropdownModule],
})
export default class ReservationModule {}
