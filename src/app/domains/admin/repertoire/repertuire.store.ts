import { inject, Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { CinemaRoomName } from "@shared/services/cinema-room.api.service";
import { Maybe } from "@shared/utility-types";
import { Observable, switchMap } from "rxjs";

import { RepertuireApiService, ShowRepertuire } from "./repertoire.api.service";

export type Screening = {
  [key in CinemaRoomName]: { hour: number; movieTitle: string };
} & { date: string };

export type RepertuireState = {
  takenTerms: string[];
  daysThatHaveRepertuire: string[];
  repertuire: Maybe<ShowRepertuire>;
  theDateOfRepertuireCurrentlyBeingDisplayed: Maybe<string>;
};

@Injectable()
export class RepertuireStore extends ComponentStore<RepertuireState> {
  private repertuireApiService = inject(RepertuireApiService);
  constructor() {
    super({
      takenTerms: [],
      daysThatHaveRepertuire: [],
      repertuire: null,
      theDateOfRepertuireCurrentlyBeingDisplayed: null,
    });

    this.select(store => store).subscribe(console.log);
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

  readonly add = this.updater((state, { date, ...screening }: Screening): RepertuireState => {
    if (date !== state.theDateOfRepertuireCurrentlyBeingDisplayed) {
      return {
        ...state,
        daysThatHaveRepertuire: [...state.daysThatHaveRepertuire, date],
      };
    }
    const cinemaRoom = Object.keys(screening)[0] as CinemaRoomName;
    if (state.repertuire && state.repertuire[cinemaRoom]) {
      return {
        ...state,
        daysThatHaveRepertuire: [...state.daysThatHaveRepertuire, date],
        repertuire: {
          ...state.repertuire,
          [cinemaRoom]: [...state.repertuire[cinemaRoom], screening[cinemaRoom]],
        },
      };
    }
    return {
      ...state,
      daysThatHaveRepertuire: [...state.daysThatHaveRepertuire, date],
      repertuire: { [cinemaRoom]: [screening[cinemaRoom]] } as ShowRepertuire,
    };
  });

  readonly setTakenTerms = this.updater((state, takenTerms: string[]): RepertuireState => {
    return {
      ...state,
      takenTerms: takenTerms,
    };
  });

  readonly daysThatHaveRepertuire$ = this.select(state => state.daysThatHaveRepertuire);

  readonly repertuire$ = this.select(state => state.repertuire);

  readonly selectTakenTerms$ = this.select(state => state.takenTerms);

  // selectMovie(movieId: string) {
  //   return this.select((state) => state.movies.find(m => m.id === movieId));
  // }
}
