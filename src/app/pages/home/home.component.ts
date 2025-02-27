import { Component } from '@angular/core';
import { CardViewComponent } from '../../shared/cards/card-view/card-view.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardViewComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
