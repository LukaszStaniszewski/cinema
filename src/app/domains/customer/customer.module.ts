import { AsyncPipe, DatePipe, NgFor, NgIf } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { WannaSeeCardComponent, WannaSeeComponent } from ".";

const routes: Routes = [
  {
    path: "wanna-see",
    component: WannaSeeComponent,
    title: "Want to see page",
  },
  {
    path: "orders",
    loadComponent: () => import("./orders/orders.component"),
    title: "My orders",
  },
];

@NgModule({
  declarations: [WannaSeeComponent, WannaSeeCardComponent],
  imports: [NgFor, NgIf, AsyncPipe, DatePipe, RouterModule.forChild(routes)],
  exports: [WannaSeeComponent],
})
export default class CustomerModule {
  constructor() {
    console.log("customer module");
  }
}
