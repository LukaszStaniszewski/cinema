import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClickOutsideDirective } from "@shared/index";

import { BookingState } from "../store";
import { CinemaRoomComponent, DropdownComponent, ReservationComponent, SummaryComponent } from ".";

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
  declarations: [CinemaRoomComponent, SummaryComponent, ReservationComponent, DropdownComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ClickOutsideDirective],
})
export default class ReservationModule {}
