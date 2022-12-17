import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShowingStateService } from './services/showings/showing-state.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  // state$ = this.showings.showings$.pipe(take(1))
  constructor(
    private route: ActivatedRoute,
    private showings: ShowingStateService
  ) {}
  get state$() {
    return this.showings.showings$;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (!params['day']) {
        return this.showDefaultPage();
      }
      const adjustedDate = params['day'].replaceAll('/', '-');
      console.log(adjustedDate);

      this.showings.getShowings(adjustedDate);
    });
  }

  private showDefaultPage() {
    this.showings.getShowings('06-12-2022');
  }
}
