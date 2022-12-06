import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie/movie.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  isLoading = true;

  constructor(public movie: MovieService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (!params['date']) {
        return this.showDefaultPage();
      }
      const adjustedDate = params['date'].replaceAll('/', '-');
      this.movie.fetchReperoire(adjustedDate);
    });

    this.isLoading = false;
  }

  private showDefaultPage() {
    this.movie.fetchReperoire('06-12-2022');
  }
}
