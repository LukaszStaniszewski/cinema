import { Component, inject, OnInit } from "@angular/core";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { RepertuireStore } from "@domains/admin/repertuire.store";
import { formatDate } from "@shared/index";

@Component({
  selector: "app-display-repertuire",
  templateUrl: "./display-repertuire.component.html",
  styleUrls: ["./display-repertuire.component.css"],
})
export class DisplaywRepertuireComponent implements OnInit {
  private repertuireStore = inject(RepertuireStore);
  startDate = new Date("12/1/2022");
  dates: string[] = [];

  vm$ = this.repertuireStore.repertuire$;

  ngOnInit() {
    this.repertuireStore.getDaysThatHaveRepertuire();

    this.repertuireStore.daysThatHaveRepertuire$.subscribe(dates => (this.dates = dates));
  }

  getRepertuire(event: MatDatepickerInputEvent<Date>) {
    if (!event.value) return;
    const formatedDate = formatDate(event.value);
    this.repertuireStore.getByDay(formatedDate);
  }

  filterDatesWithRepertuire = (inputDate: Date | null): boolean => {
    if (this.dates.length === 0) return false;
    const formatedDate = inputDate ? formatDate(inputDate) : formatDate(new Date());

    return this.dates.includes(formatedDate);
  };
}
