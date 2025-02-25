import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardDetailComponent } from './shared/cards/card-detail/card-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardDetailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontendAngular';
}
