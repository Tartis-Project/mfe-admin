import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardViewComponent } from "./shared/cards/card-view/card-view.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontendAngular';
}