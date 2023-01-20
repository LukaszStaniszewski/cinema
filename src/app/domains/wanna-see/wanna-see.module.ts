import { NgFor, NgIf } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { WannaSeeComponent } from "./wanna-see/wanna-see.component";

const routes: Routes = [
  {
    path: "",
    component: WannaSeeComponent,
    title: "Want to see page",
  },
];

@NgModule({
  declarations: [],
  imports: [NgFor, NgIf, RouterModule.forChild(routes)],
})
export default class WannaSeeModule {}
