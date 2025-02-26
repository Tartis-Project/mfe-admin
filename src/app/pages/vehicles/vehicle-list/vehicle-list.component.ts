import { Component } from '@angular/core';
import { CardViewComponent } from "../../../shared/cards/card-view/card-view.component";

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CardViewComponent],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss'
})
export class VehicleListComponent {

}
