import { Component } from '@angular/core';
import { CardViewComponent } from "../../shared/cards/card-view/card-view.component";

@Component({
  selector: 'app-rates',
  standalone: true,
  imports: [CardViewComponent],
  templateUrl: './rates.component.html',
  styleUrl: './rates.component.scss'
})
export class RatesComponent {

}
