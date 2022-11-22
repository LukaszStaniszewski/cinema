import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TicketPurchasePageComponent } from './ticket-purchase-page/ticket-purchase-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './card/card.component';
import { ReservationPageComponent } from './reservation-page/reservation-page.component';
import { FilmDatesComponent } from './film-dates/film-dates.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TicketPurchasePageComponent,
    NavbarComponent,
    CardComponent,
    ReservationPageComponent,
    FilmDatesComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
