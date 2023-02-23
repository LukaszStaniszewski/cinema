import { Component, inject } from "@angular/core";
import { FormControl } from "@angular/forms";

import { RepertuireApiService } from "../repertoire.api.service";

@Component({
  selector: "app-show-repertuire",
  templateUrl: "./show-repertuire.component.html",
  styleUrls: ["./show-repertuire.component.css"],
})
export class ShowRepertuireComponent {
  private repertuireApiService = inject(RepertuireApiService);
  dates = ["06-12-2022", "07-12-2022"];
  vm$ = this.repertuireApiService.getByDay("06-12-2022");
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
}
