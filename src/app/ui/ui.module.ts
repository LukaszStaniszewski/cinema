import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CanMatchCustomerSection } from "@core/guards/canMatchCustomerSection.guard";
import CartComponent from "@domains/customer/cart/cart.component";
import { ClickOutsideDirective } from "@shared/index";

import { NavbarComponent } from "./navbar/navbar.component";

const routes: Routes = [
  {
    path: "",
    component: NavbarComponent,
    children: [
      {
        path: "",
        loadComponent: () => import("../domains/customer/cart/cart.component"),
        outlet: "cart",
        canMatch: [CanMatchCustomerSection],
      },
    ],
  },
];
@NgModule({
  declarations: [NavbarComponent],
  imports: [ClickOutsideDirective, RouterModule.forChild(routes), CommonModule, CartComponent],
  exports: [NavbarComponent],
})
export default class UiModule {}
