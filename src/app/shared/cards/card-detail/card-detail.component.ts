import { Component } from '@angular/core';

import { MaterialModule } from '../../../material/material.module';

export const VEHICLE_MOCK = {
  id: 1,
  license: '8631GCH',
  brand: 'Toyota',
  model: 'Corolla',
  color: 'Rojo',
  type: 'Coche',
  doors: '5'
};

@Component({
  selector: 'app-card-detail',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.scss'
})
export class CardDetailComponent {

  vehicle: any;

  ngOnInit(): void {
    this.vehicle = VEHICLE_MOCK;
  }

}
