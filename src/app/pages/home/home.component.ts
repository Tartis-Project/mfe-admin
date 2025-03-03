import { Component, computed, inject } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { Observable, combineLatest, map } from 'rxjs';
import { Floor } from '../parking/interfaces/floor.model';
import { ParkingService } from '../parking/services/parking.service';
import { RouterModule } from '@angular/router';
import { ParkingSpot } from '../parking/interfaces/parkingSpot.model';
import { ParkingSpotService } from '../parking/services/parkingSpot.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private parkingService = inject(ParkingService);
  private parkingSpotService = inject(ParkingSpotService);

  floors$: Observable<Floor[]> = this.parkingService.getFloors();
  spots$: Observable<ParkingSpot[]> = this.parkingSpotService.getParkingSpots();

  floorsWithOccupiedSpots$ = combineLatest([this.floors$, this.spots$]).pipe(
    map(([floors, spots]) => {
      return floors.map(floor => ({
        ...floor,
        occupiedSpots: spots.filter(spot => spot.idFloor === floor.id && spot.isOccupied).length
      }));
    })
  );
}
