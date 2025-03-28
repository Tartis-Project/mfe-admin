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
import { EventSourceService } from './services/sse/eventsource.service';
import { Entry } from '../../shared/interfaces/entry.model';
import { KeycloakService } from 'keycloak-angular';
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

  floorsWithOccupiedSpots$!: Observable<(Floor & { occupiedSpots: number })[]>;
  latestMovements$!: Observable<Registry[]>;
  vehiclesMap: { [id: string]: Vehicle } = {};

  entries: Entry[] = [];
  exits: Entry[] = [];

  constructor(
    private router: Router,
    private eventSourceService: EventSourceService,
    // private administratorService: AdminService,
  ) {
    this.eventSourceService.connect();

    this.eventSourceService.spotUpdates$.subscribe((data) => {
      if (!data) return;
      this.loadVehicles()

      this.loadFloors()

      this.loadRegistries()
    });


    this.loadVehicles()

    this.loadFloors()

    this.loadRegistries()

  }

  loadVehicles() {
    this.vehicleService.getVehicles().subscribe((vehicles) => {
      this.vehiclesMap = vehicles.reduce(
        (acc, vehicle) => {
          acc[vehicle.id] = vehicle;
          return acc;
        },
        {} as { [id: string]: Vehicle },
      );
    });
  }

  loadFloors() {
    this.floorsWithOccupiedSpots$ = combineLatest([
      this.parkingService.getFloors(),
      this.parkingSpotService.getParkingSpots(),
    ]).pipe(
      map(([floors, spots]) => {
        return floors.map((floor) => ({
          ...floor,
          occupiedSpots: spots.filter(
            (spot) => spot.idFloor === floor.id && spot.occupied,
          ).length,
        }));
      }),
    );
  }

  loadRegistries() {
    this.latestMovements$ = this.registryService.getRegistries().pipe(
      map((registries) =>
        registries
          .sort((a, b) => {
            const dateA = new Date(b.exitTime || b.entryTime).getTime();
            const dateB = new Date(a.exitTime || a.entryTime).getTime();
            return dateA - dateB;
          })
          .slice(0, 4)
      )
    );
  }

  ngOnInit(): void {



  }

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
