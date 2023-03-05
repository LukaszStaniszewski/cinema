import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "wanna-see",

    loadChildren: () => import("./watch-list/wanna-see/wanna-see.component"),
    title: "Want to see page",
  },
  {
    path: "orders",
    loadComponent: () => import("./orders/orders.component"),
    title: "My orders",
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export default class CustomerModule {}
