import { Injectable } from "@angular/core";
import { Movie } from "@core/movie/watch-list.service";
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
