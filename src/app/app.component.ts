import { Component } from '@angular/core';
import { StateService } from 'src/services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'cinema';
  constructor() {}
}
