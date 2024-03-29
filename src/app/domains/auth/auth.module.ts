import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
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
  declarations: [LoginComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
})
export default class DashboardModule {}
