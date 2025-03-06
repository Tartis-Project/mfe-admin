import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';


import { CardDetailComponent } from '../../../../shared/cards/card-detail/card-detail.component';
import { MaterialModule } from '../../../../material/material.module';
import { Vehicle } from '../../interfaces/vehicle.model';
import { VehicleService } from '../../services/vehicle.service';
import { ParkingSpot } from '../../../parking/interfaces/parkingSpot.model';
import { Rate } from '../../../rates/interfaces/rates.model';
import { ParkingSpotService } from '../../../parking/services/parkingSpot.service';
import { RateService } from '../../../rates/services/rates.service';
import { Registry } from '../../../../shared/registry/interfaces/registry.model';
import { RegistryService } from '../../../../shared/registry/services/registry.service';

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [MaterialModule, CardDetailComponent, RouterModule],
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.scss',
})
export class VehicleDetailComponent implements OnInit{

  @Input() vehicle!: Vehicle;
  parkingSpots: { [key: string]: ParkingSpot } = {};
  rates: { [key: string]: Rate } = {};
  registries: Registry[] = []
  registryActive?: Registry
  rateActive?: Rate
  parkingSpotActive?: ParkingSpot
  isDataLoaded = false;


  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private parkingSpotService: ParkingSpotService,
    private rateService: RateService,
    private registryService: RegistryService
  ){}

  ngOnInit(): void {
    const vehicleId = this.route.snapshot.paramMap.get('id');
    if (vehicleId) {
      this.vehicleService.getVehicleById(vehicleId).subscribe((data) => {
        if (data) {
          this.vehicle = data;
          this.registryService.getRegistries().subscribe(res => {
            this.loadRegistries(res);
          })


        } else {
          console.error('Vehículo no encontrado');
        }
      });
    }

    this.isDataLoaded = true;
  }

  loadRegistries(registries: Registry[]) {
    if (!this.vehicle) {
      return;

    }
      this.registries = registries.filter(r => r.idVehicle === this.vehicle.id);

      if (this.vehicle.active) {
        const activeRegistry = this.registries.find(r => {
          return !r.exitTime || isNaN(new Date(r.exitTime).getTime());
        });
        if (activeRegistry) {
          this.registryActive = activeRegistry;
          this.getRate()
          this.getSpotNumber()
        } else {
          console.log('No se encontró un registro activo.');
        }
        this.registries = this.registries.filter(r => {
          return !r.exitTime || !isNaN(new Date(r.exitTime).getTime());
        });

      }
      this.registries.forEach(registry => {
        this.getRegistyDetails(registry);
      });

  }


  getRegistyDetails(registryId: Registry): void {
    this.parkingSpotService.getParkingSpotById(registryId.idParkingSpot).subscribe(res => {
        this.parkingSpots[registryId.idParkingSpot] = res;
      }
    );

    this.rateService.getRateById(registryId.idRate).subscribe(res => {
      this.rates[registryId.idRate] = res
    })
  }

  getSpotNumber(): void {
    this.parkingSpotService.getParkingSpotById(this.registryActive!.idParkingSpot).subscribe(res => {
      this.parkingSpotActive = res;
  })
}

getRate(): void{
  this.rateService.getRateById(this.registryActive!.idRate).subscribe(res => {
    this.rateActive = res
  })
}

  onVehicleUpdated(updatedVehicle: Vehicle) {
    this.vehicle = updatedVehicle;
  }
}
