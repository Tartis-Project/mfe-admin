import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { Observable, combineLatest, map } from 'rxjs';
import { Floor } from '../parking/interfaces/floor.model';
import { ParkingService } from '../parking/services/parking.service';
import { RouterModule } from '@angular/router';
import { ParkingSpot } from '../parking/interfaces/parkingSpot.model';
import { ParkingSpotService } from '../parking/services/parkingSpot.service';
import { Registry } from '../../shared/registry/interfaces/registry.model';
import { RegistryService } from '../../shared/registry/services/registry.service';
import { Vehicle } from '../vehicles/interfaces/vehicle.model';
import { VehicleService } from '../vehicles/services/vehicle.service';

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
  private registryService = inject(RegistryService);
  private vehicleService = inject(VehicleService);

  floors$: Observable<Floor[]> = this.parkingService.getFloors();
  spots$: Observable<ParkingSpot[]> = this.parkingSpotService.getParkingSpots();
  vehicles$: Observable<Vehicle[]> = this.vehicleService.getVehicles();
  floorsWithOccupiedSpots$ = combineLatest([this.floors$, this.spots$]).pipe(
    map(([floors, spots]) => {
      return floors.map(floor => ({
        ...floor,
        occupiedSpots: spots.filter(spot => spot.idFloor === floor.id && spot.isOccupied).length
      }));
    })
  );

  latestMovements$: Observable<Registry[]> = this.registryService.getRegistries().pipe(
    map(registries =>
      registries
        .sort((a, b) => new Date(b.entryTime).getTime() - new Date(a.entryTime).getTime())
        .slice(0, 4)
    )
  );

  vehiclesMap: { [id: string]: Vehicle } = {};

  constructor() {
    this.vehicles$.subscribe(vehicles => {
      this.vehiclesMap = vehicles.reduce((acc, vehicle) => {
        acc[vehicle.id] = vehicle;
        return acc;
      }, {} as { [id: string]: Vehicle });
    });
  }



  getVehicleById(id: string): Vehicle {
    return this.vehiclesMap[id];
  }

  isEntry(exitTime: any): boolean {
    return !exitTime || exitTime === 'NaT' || exitTime === 'Invalid Date';
  }
}
