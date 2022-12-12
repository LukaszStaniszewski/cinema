import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TicketPurchasePageComponent } from './ticket-purchase-page/ticket-purchase-page.component';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CardComponent } from './card/card.component';
import { ReservationPageComponent } from './reservation-page/reservation-page.component';
import { FilmDatesComponent } from './film-dates/film-dates.component';
import { ClickOutsideDirective } from './ui/directives/clickOutside.directive';
import { CustomHttpInterceptor } from './interceptor/custom-http.interceptor';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CinemaRoomComponent } from './cinema-room/cinema-room.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { TicketDetails2Component } from './ticket-details2/ticket-details2.component';
// import { UserService } from './user/user.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TicketPurchasePageComponent,
    NavbarComponent,
    CardComponent,
    ReservationPageComponent,
    FilmDatesComponent,
    ClickOutsideDirective,
    PageNotFoundComponent,
    CinemaRoomComponent,
    TicketDetailsComponent,
    TicketDetails2Component,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    },
    // {
    //   provide: APP_INITIALIZER,
    //   useValue: (userService: UserService) => {

    //   },
    //   deps: [UserService]
    // }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
