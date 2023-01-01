import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ClickOutsideModule } from 'src/app/shared/directives/clickOutside.directive';

import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [ClickOutsideModule, AppRoutingModule, BrowserModule],
  exports: [NavbarComponent],
})
export class UiModule {}
