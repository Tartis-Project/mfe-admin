import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import {
  Observable,
  combineLatest,
  map,
  interval,
  switchMap,
  Subscription,
  startWith,
} from 'rxjs';
import { Floor } from '../parking/interfaces/floor.model';
import { ParkingService } from '../parking/services/parking.service';
import { Router, RouterModule } from '@angular/router';
import { ParkingSpotService } from '../parking/services/parkingSpot.service';
import { Registry } from '../../shared/registry/interfaces/registry.model';
import { RegistryService } from '../../shared/registry/services/registry.service';
import { Vehicle } from '../vehicles/interfaces/vehicle.model';
import { VehicleService } from '../vehicles/services/vehicle.service';
// import { KeycloakService } from 'keycloak-angular';
// import { AdminService } from '../admin/services/administrator.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  private parkingService = inject(ParkingService);
  private parkingSpotService = inject(ParkingSpotService);
  private registryService = inject(RegistryService);
  private vehicleService = inject(VehicleService);
  private pollingSubscription!: Subscription;

  floorsWithOccupiedSpots$: Observable<(Floor & { occupiedSpots: number })[]>;
  latestMovements$: Observable<Registry[]>;
  vehiclesMap: { [id: string]: Vehicle } = {};

  constructor(
    private router: Router,
    // private administratorService: AdminService,
  ) {
    this.vehicleService.getVehicles().subscribe((vehicles) => {
      this.vehiclesMap = vehicles.reduce(
        (acc, vehicle) => {
          acc[vehicle.id] = vehicle;
          return acc;
        },
        {} as { [id: string]: Vehicle },
      );
    });

    this.floorsWithOccupiedSpots$ = interval(5000).pipe(
      startWith(0),
      switchMap(() =>
        combineLatest([
          this.parkingService.getFloors(),
          this.parkingSpotService.getParkingSpots(),
        ]),
      ),
      map(([floors, spots]) => {
        return floors.map((floor) => ({
          ...floor,
          occupiedSpots: spots.filter(
            (spot) => spot.idFloor === floor.id && spot.occupied,
          ).length,
        }));
      }),
    );

    this.latestMovements$ = interval(5000).pipe(
      startWith(0),
      switchMap(() => this.registryService.getRegistries()),
      map((registries) =>
        registries
          .sort(
            (a, b) =>
              new Date(b.entryTime).getTime() - new Date(a.entryTime).getTime(),
          )
          .slice(0, 4),
      ),
    );
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }

  getVehicleById(id: string): Vehicle {
    return this.vehiclesMap[id];
  }

  isEntry(exitTime: any): boolean {
    return !exitTime || exitTime === 'NaT' || exitTime === 'Invalid Date';
  }

  goDetail(id: string) {
    // this.router.navigate(['/vehicles', id]);
  }

  // logout() {
  //   this.administratorService.logout();
  // }

  // getUserFirstName(): string | null {
  //   return this.administratorService.getUserFirstName();
  // }
}
