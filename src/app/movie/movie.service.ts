import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/environments/constants';
import { Maybe } from '../user/user.service';

export type Movie = {
  id: number;
  title: string;
  genre: string;
  length: number;
  description: string;
  rating: number;
  pg: number;
  screenings: string[];
};

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  isLoading = true;
  movies: Maybe<Movie[]>;
  constructor(private http: HttpClient) {}

  fetchMovies() {
    // return this.http.get<Movie[]>(API.MOVIES);
    this.http.get<Movie[] | undefined>(API.MOVIES).subscribe((movies) => {
      this.movies = movies;
      console.log(movies);
      this.isLoading = false;
    });
  }

  addToFavorites() {
    // if user logged in post request
    // else add to local storage
  }
}
