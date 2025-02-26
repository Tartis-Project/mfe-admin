import { Component } from '@angular/core';
import { CardDetailComponent } from '../../../shared/cards/card-detail/card-detail.component';
import { MaterialModule } from '../../../material/material.module';

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [MaterialModule, CardDetailComponent],
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.scss'
})
export class VehicleDetailComponent {

}
