import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MovieService } from "@core/movie/movie.service";

@Component({
  selector: "app-wanna-see",
  templateUrl: "./wanna-see.component.html",
  styleUrls: ["./wanna-see.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WannaSeeComponent {
  private movieService = inject(MovieService);
  vm$ = this.movieService.getFavorites();

  protected removeFromWannaSee(moveId: string) {
    this.movieService.deleteFavorite(moveId);
  }
}
