import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from ".";
const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
    title: "Login Page",
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export default class DashboardModule {}
