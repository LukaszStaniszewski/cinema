import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { CardComponent, DashboardComponent, DatesComponent } from '.';

@NgModule({
  declarations: [CardComponent, DatesComponent, DashboardComponent],
  exports: [CardComponent, DatesComponent, DashboardComponent],
  imports: [BrowserModule, AppRoutingModule],
})
export class DashboardModule {}
