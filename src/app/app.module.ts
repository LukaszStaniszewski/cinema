import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {
  DashboardComponent,
  CardComponent,
  DatesComponent,
} from './domains/dashboard';
import { TicketPurchasePageComponent } from './domains/review/ticket-purchase-page.component';
import { NavbarComponent } from './shared/ui/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReservationPageComponent } from './domains/reservation/reservation-page.component';

import { ClickOutsideDirective } from './shared/directives/clickOutside.directive';
import { CustomHttpInterceptor } from './shared/interceptor/custom-http.interceptor';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import {
  CinemaRoomComponent,
  TicketDetailsComponent,
  SummaryComponent,
} from './domains/reservation';

import { DropdownComponent } from './shared/ui/dropdown/dropdown.component';

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
