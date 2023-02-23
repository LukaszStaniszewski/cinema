import { Component, inject } from "@angular/core";

import { RepertuireApiService } from "../repertoire.api.service";

@Component({
  selector: "app-show-repertuire",
  templateUrl: "./show-repertuire.component.html",
  styleUrls: ["./show-repertuire.component.css"],
})
export class ShowRepertuireComponent {
  private repertuireApiService = inject(RepertuireApiService);

  vm$ = this.repertuireApiService.getByDay("06-12-2022");
}
