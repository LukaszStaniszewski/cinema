import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

import { CardListComponent } from "./domains/dashboard";
import { PageNotFoundComponent } from "./shared/page-not-found/page-not-found.component";
import { ShellComponent } from "./shell/shell.component";

const routes: Routes = [
  { path: "", redirectTo: "showings/06-12-2022", pathMatch: "full" },

  {
    path: "",
    component: ShellComponent,
    children: [
      {
        path: "showings/:day",
        component: CardListComponent,
        title: "Dashboard",
      },
      {
        path: "booking",
        loadChildren: () => import("./domains/booking/booking.module"),
      },
      {
        path: "",
        loadChildren: () => import("./domains/customer/wanna-see/customer.module"),
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
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  // imports: [provideRouter(routes, with)],
  exports: [RouterModule],
  // providers: [provideRouter(routes, withPreloading(PreloadAllModules))],
})
export class AppRoutingModule {}
