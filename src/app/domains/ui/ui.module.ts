import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CanMatchCustomerSection } from "@core/guards/canMatchCustomerSection.guard";
import { ClickOutsideDirective } from "@shared/index";

import { NavbarComponent } from "./navbar/navbar.component";

const routes: Routes = [
  {
    path: "",
    component: NavbarComponent,
    children: [
      {
        path: "",
        loadComponent: () => import("./cart/cart.component"),
        outlet: "cart",
        canMatch: [CanMatchCustomerSection],
      },
    ],
  },
];
@NgModule({
  declarations: [NavbarComponent],
  imports: [ClickOutsideDirective, RouterModule.forChild(routes), CommonModule],
  exports: [NavbarComponent],
})
export default class UiModule {}
