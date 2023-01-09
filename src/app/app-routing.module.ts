import { NgModule } from "@angular/core";
import {
  PreloadAllModules,
  provideRouter,
  RouterModule,
  Routes,
  withPreloading,
} from "@angular/router";

import { DashboardComponent } from "./domains/dashboard/dashboard.component";
import { PageNotFoundComponent } from "./shared/page-not-found/page-not-found.component";
import { ShellComponent } from "./shell/shell.component";

const routes: Routes = [
  { path: "", redirectTo: "showings/06-12-2022", pathMatch: "full" },
  { path: "showings/:day", component: DashboardComponent, title: "Dashboard" },
  {
    path: "",
    component: ShellComponent,
    children: [
      {
        path: "purchase",
        loadChildren: () => import("./domains/review/review.module"),
      },
      {
        path: "reservation",
        loadChildren: () => import("./domains/reservation/reservation.module"),
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
