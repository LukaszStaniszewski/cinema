import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthService } from "@domains/auth";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { SpinnerComponent } from "@shared/ui/spinner/spinner.component";
import { ToastComponent } from "@shared/ui/toast/toast.component";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { CustomHttpInterceptor } from "./core/interceptors/custom-http.interceptor";
import { PageNotFoundComponent } from "./shared/page-not-found/page-not-found.component";
import { ShellComponent } from "./shell/shell.component";

function initFactory(initService: AuthService) {
  return () => initService.autoLogin();
}

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, ShellComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastComponent,
    SpinnerComponent,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initFactory,
      deps: [AuthService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
