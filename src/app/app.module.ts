import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AuthenticationService } from "@domains/auth";
import { DashboardModule } from "@domains/dashboard/dashboard.modules";

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
