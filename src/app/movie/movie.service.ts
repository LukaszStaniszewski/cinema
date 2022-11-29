import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/environments/constants';
import { Maybe } from '../user/user.service';

type Movie = {
  id: number;
  title: string;
  genre: string;
  length: number;
  description: string;
  rating: number;
};

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  movies: Maybe<Movie[]>;
  constructor(private http: HttpClient) {}

  fetchMovies() {
    // return this.http.get<Movie[]>(API.MOVIES);
    this.http.get<Movie[]>(API.MOVIES).subscribe((movies) => {
      this.movies = movies;
    });
  }
}
