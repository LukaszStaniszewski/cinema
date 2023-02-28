import { Component } from "@angular/core";

@Component({
  selector: "app-spinner",
  template: `
    <div class="backdrop">
      <div class="spinner">
        <div class="spinner-inner">
          <div></div>
          <div></div>
          <div><div></div></div>
          <div><div></div></div>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  styleUrls: ["./spinner.component.css"],
})
export class SpinnerComponent {}
