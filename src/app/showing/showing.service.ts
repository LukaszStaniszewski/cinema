import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, forkJoin } from 'rxjs';
import { API } from 'src/environments/constants';

@Injectable({
  providedIn: 'root',
})
export class ShowingService {
  constructor(private http: HttpClient) {}

  fetchShowing(movieId: string) {
    forkJoin([this.http.get(`/${API.SCREENING}/`), this.http.get('')]);
  }
}
