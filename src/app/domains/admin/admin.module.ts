import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { RouterModule, Routes } from "@angular/router";

import { CreateShowingComponent, RepertoireComponent, ShowingService } from ".";
import { AddMovieComponent } from "./add-movie/add-movie.component";
import { DisplayRepertoireComponent } from "./repertoire/display-repertoire/display-repertoire.component";

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
  declarations: [RepertoireComponent, CreateShowingComponent, DisplayRepertoireComponent, AddMovieComponent],
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    MatTabsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  providers: [ShowingService],
})
export default class AdminModule {}
