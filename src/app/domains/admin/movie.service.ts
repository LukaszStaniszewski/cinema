import { Injectable } from "@angular/core";
import { Movie } from "@domains/customer/watch-list/watch-list.service";
import { ComponentStore } from "@ngrx/component-store";

export type MoveState = {
  movies: Movie[];
};

@Injectable()
export class MovieService extends ComponentStore<MoveState> {
  constructor() {
    super({ movies: [] });
  }
}
