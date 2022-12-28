import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardModule } from './domains/dashboard';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CustomHttpInterceptor } from './shared/interceptors/custom-http.interceptor';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

import { ShellComponent } from './shell/shell.component';
import { UiModule } from './domains/ui';
import { ReviewModule } from './domains/review/review.module';
import { ReservationModule } from './domains/reservation';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, ShellComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    DashboardModule,
    ReviewModule,
    UiModule,
    ReservationModule,
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
