import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TicketPurchasePageComponent } from './booking/purchase/ticket-purchase-page.component';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CardComponent } from './dashboard/card/card.component';
import { ReservationPageComponent } from './booking/reservation/reservation-page.component';
import { DatesComponent } from './dashboard/dates/dates.component';
import { ClickOutsideDirective } from './ui/directives/clickOutside.directive';
import { CustomHttpInterceptor } from './shared/interceptor/custom-http.interceptor';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CinemaRoomComponent } from './booking/reservation/cinema-room/cinema-room.component';
import { TicketDetailsComponent } from './booking/reservation/ticket-details/ticket-details.component';
import { DropdownComponent } from './ui/dropdown/dropdown.component';
import { SummaryComponent } from './booking/reservation/summary/summary.component';
// import { UserService } from './user/user.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TicketPurchasePageComponent,
    NavbarComponent,
    CardComponent,
    ReservationPageComponent,
    DatesComponent,
    ClickOutsideDirective,
    PageNotFoundComponent,
    CinemaRoomComponent,
    TicketDetailsComponent,
    DropdownComponent,
    SummaryComponent,
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
