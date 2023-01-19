import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { DashboardModule } from "@domains/dashboard/dashboard.modules";
import { CookieService } from "ngx-cookie-service";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { CustomHttpInterceptor } from "./core/interceptors/custom-http.interceptor";
import { UiModule } from "./domains/ui";
import { PageNotFoundComponent } from "./shared/page-not-found/page-not-found.component";
import { ShellComponent } from "./shell/shell.component";

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, ShellComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    DashboardModule,
    UiModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    },
    CookieService,
    // {
    //   provide: [APP_INITIALIZER, AuthenticationService],
    //   useValue: (userService: AuthenticationService) => {
    //     userService.autoLogin();
    //   },
    //   deps: [AuthenticationService],
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
