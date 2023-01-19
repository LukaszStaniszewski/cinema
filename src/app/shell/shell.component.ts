import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "@domains/auth";

@Component({
  selector: "app-shell",
  templateUrl: "./shell.component.html",
  styleUrls: ["./shell.component.css"],
})
export class ShellComponent implements OnInit {
  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.authService.autoLogin();
  }
}
