import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ClickOutsideDirective } from "@shared/index";
import { AppRoutingModule } from "src/app/app-routing.module";

import { NavbarComponent } from "./navbar/navbar.component";

@NgModule({
  declarations: [NavbarComponent],
  imports: [ClickOutsideDirective, AppRoutingModule, BrowserModule],
  exports: [NavbarComponent],
})
export class UiModule {}
