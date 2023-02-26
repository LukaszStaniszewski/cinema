import { Component, inject, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";

import { RepertuireApiService } from "../repertoire.api.service";

@Component({
  selector: "app-display-repertuire",
  templateUrl: "./display-repertuire.component.html",
  styleUrls: ["./display-repertuire.component.css"],
})
export class DisplaywRepertuireComponent implements OnInit {
  private repertuireApiService = inject(RepertuireApiService);
  startDate = new Date("12/5/2022");
  dates = ["06-12-2022", "07-12-2022"];
  vm$ = this.repertuireApiService.getByDay("06-12-2022");

  ngOnInit() {
    this.repertuireApiService.getDaysThatHaveAddedRepertuire;
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
}
