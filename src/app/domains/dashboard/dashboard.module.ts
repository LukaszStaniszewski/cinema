import { AsyncPipe, NgFor, NgIf, TitleCasePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CanMatchCustomerSection } from "@core/index";
import { MouseAnimationDirective } from "@shared/directives/mouseAnimation.directive";
import { SpinnerComponent } from "@shared/ui/spinner/spinner.component";
import { ToastComponent } from "@shared/ui/toast/toast.component";

import { CardComponent, CardListComponent, DatesComponent } from ".";

const routes: Routes = [
  {
    path: "",
    component: CardListComponent,
    children: [
      {
        path: "",
        loadChildren: () => import("./customer-section/customer-section.module"),
        canMatch: [CanMatchCustomerSection],
      },
    ],
  },
];

@NgModule({
  declarations: [CardComponent, DatesComponent, CardListComponent],
  imports: [
    NgIf,
    NgFor,
    TitleCasePipe,
    AsyncPipe,
    MouseAnimationDirective,
    ToastComponent,
    SpinnerComponent,
    RouterModule.forChild(routes),
  ],
})
export default class DashboardModule {}
