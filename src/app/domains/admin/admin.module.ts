import { AsyncPipe, JsonPipe, KeyValuePipe, NgFor, NgIf } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MAT_DATE_LOCALE, MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { MatTabsModule } from "@angular/material/tabs";
import { RouterModule, Routes } from "@angular/router";

import { AddScreeningComponent, RepertoireComponent, RepertuireStore } from ".";
import { AddMovieComponent } from "./add-movie/add-movie.component";
import { DisplaywRepertuireComponent } from "./repertoire/display-repertoire/display-repertuire.component";

const routes: Routes = [
  {
    path: "repertoire",
    component: RepertoireComponent,
  },
  {
    path: "movie",
    component: AddMovieComponent,
  },
];

@NgModule({
  declarations: [RepertoireComponent, AddScreeningComponent, AddMovieComponent, DisplaywRepertuireComponent],
  imports: [
    NgIf,
    NgFor,
    KeyValuePipe,
    AsyncPipe,
    MatTabsModule,
    JsonPipe,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatListModule,
    MatFormFieldModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule,
  ],
  providers: [RepertuireStore, { provide: MAT_DATE_LOCALE, useValue: "en-GB" }],
})
export default class AdminModule {}
