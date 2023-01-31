import { AsyncPipe, DatePipe, NgFor, NgIf } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { WannaSeeCardComponent } from "./card/wanna-see-card.component";
import { WannaSeeComponent } from "./wanna-see/wanna-see.component";

const routes: Routes = [
  {
    path: "",
    component: WannaSeeComponent,
    title: "Want to see page",
  },
];

@NgModule({
  declarations: [WannaSeeComponent, WannaSeeCardComponent],
  imports: [NgFor, NgIf, AsyncPipe, DatePipe, RouterModule.forChild(routes)],
})
export default class CustomerModule {}
