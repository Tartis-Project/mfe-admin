import { Component, inject } from '@angular/core';
import { CardViewComponent } from '../../shared/cards/card-view/card-view.component';
import { MaterialModule } from '../../material/material.module';
import { Observable } from 'rxjs';
import { Floor } from '../parking/interfaces/floor.model';
import { ParkingService } from '../parking/services/parking.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private parkingService = inject(ParkingService);
  floors$: Observable<Floor[]> = this.parkingService.getFloors();

  ngOnInit(): void {}
}
