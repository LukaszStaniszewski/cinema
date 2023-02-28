import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import {
  AppCustomPreloader,
  CanMatchAdminSection,
  CanMatchCustomerSection,
  CanMatchNonAuthSection,
} from "./core";
import { PageNotFoundComponent } from "./shared/page-not-found/page-not-found.component";
import { ShellComponent } from "./shell/shell.component";

const routes: Routes = [
  { path: "", redirectTo: "showings/06-12-2022", pathMatch: "full" },

  {
    path: "",
    children: [
      {
        path: "",
        component: ShellComponent,
        children: [
          {
            path: "",
            loadChildren: () => import("./domains/ui/ui.module"),
            outlet: "navbar",
          },
          {
            path: "showings/:day",
            loadChildren: () => import("./domains/dashboard/dashboard.module"),
            title: "Dashboard",
            data: { preload: true },
          },
          {
            path: "booking",
            loadChildren: () => import("./domains/booking/booking.module"),
            data: { preload: true },
          },
          {
            path: "customer",
            loadChildren: () => import("./domains/customer/customer.module"),
            canMatch: [CanMatchCustomerSection],
          },
          {
            path: "admin",
            loadChildren: () => import("./domains/admin/admin.module"),
            canMatch: [CanMatchAdminSection],
          },
        ],
      },
      {
        path: "login",
        loadChildren: () => import("./domains/auth/auth.module"),
        canActivate: [CanMatchNonAuthSection],
      },
    ],
  },

  { path: "**", component: PageNotFoundComponent, title: "Page Not Found" },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: AppCustomPreloader })],
  exports: [RouterModule],
  providers: [AppCustomPreloader],
})
export class AppRoutingModule {}
