import { inject, Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Maybe } from "@shared/utility-types";
import { Observable, switchMap } from "rxjs";

import { RepertuireApiService, ShowRepertuire } from "./repertoire/repertoire.api.service";

export type RepertuireState = {
  takenTerms: string[];
  daysThatHaveRepertuire: string[];
  repertuire: Maybe<ShowRepertuire>;
};

@Injectable()
export class RepertuireStore extends ComponentStore<RepertuireState> {
  private repertuireApiService = inject(RepertuireApiService);
  constructor() {
    super({ takenTerms: [], daysThatHaveRepertuire: [], repertuire: null });
    // this.select(store => store).subscribe(console.log);
  }

  readonly getByDay = this.effect((date$: Observable<string>) =>
    date$.pipe(
      switchMap(date => this.repertuireApiService.getByDay(date)),
      tapResponse(
        repertuire => this.setRepertuire(repertuire),
        error => error
      )
    )
  );

  readonly getDaysThatHaveRepertuire = this.effect(() =>
    this.repertuireApiService.getDaysThatHaveAddedRepertuire().pipe(
      tapResponse(
        days => this.addDaysThatHaveRepertuire(days),
        error => error
      )
    )
  );

  readonly addDaysThatHaveRepertuire = this.updater((state, days: string[]): RepertuireState => {
    return { ...state, daysThatHaveRepertuire: [...state.daysThatHaveRepertuire, ...days] };
  });

  readonly setRepertuire = this.updater((state, repertuire: ShowRepertuire): RepertuireState => {
    return {
      ...state,
      repertuire: repertuire,
    };
  });

  readonly daysThatHaveRepertuire$ = this.select(state => state.daysThatHaveRepertuire);

  readonly repertuire$ = this.select(state => state.repertuire);
}
