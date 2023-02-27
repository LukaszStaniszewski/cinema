import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

import { AppCustomPreloader, CanMatchCustomerSection } from "./core";
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
            path: "wanna-see",
            loadChildren: () => import("./domains/customer/customer.module"),
            canMatch: [CanMatchCustomerSection],
          },
          {
            path: "admin",
            loadChildren: () => import("./domains/admin/admin.module"),
          },
        ],
      },
      {
        path: "login",
        loadChildren: () => import("./domains/auth/auth.module"),
      },
    ],
  },

  { path: "**", component: PageNotFoundComponent, title: "Page Not Found" },
];
@NgModule({
  declarations: [],
  // imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: AppCustomPreloader })],
  // imports: [provideRouter(routes, with)],
  exports: [RouterModule],
  providers: [AppCustomPreloader],
  // providers: [provideRouter(routes, withPreloading(PreloadAllModules))],
})
export class AppRoutingModule {}
