import { Component, OnInit } from "@angular/core";
import { MovieService } from "@core/movie/movie.service";
import { AuthenticationService } from "@domains/auth";

@Component({
  selector: "app-shell",
  templateUrl: "./shell.component.html",
  styleUrls: ["./shell.component.css"],
})
export class ShellComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.authService.autoLogin();
  }
}
