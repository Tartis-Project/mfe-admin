import { Component } from '@angular/core';
import { CardViewComponent } from "../../shared/cards/card-view/card-view.component";

@Component({
  selector: 'app-parking',
  standalone: true,
  imports: [CardViewComponent],
  templateUrl: './parking.component.html',
  styleUrl: './parking.component.scss'
})
export class ParkingComponent {

}
