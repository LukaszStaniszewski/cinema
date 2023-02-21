import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatTabsModule } from "@angular/material/tabs";
import { RouterModule, Routes } from "@angular/router";

import { CreateShowingComponent, RepertoireComponent, ShowingService } from ".";
import { DisplayRepertoireComponent } from "./repertoire/display-repertoire/display-repertoire.component";

const routes: Routes = [
  {
    path: "",
    component: RepertoireComponent,
  },
];

@NgModule({
  declarations: [RepertoireComponent, CreateShowingComponent, DisplayRepertoireComponent],
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    MatTabsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [ShowingService],
})
export default class AdminModule {}
