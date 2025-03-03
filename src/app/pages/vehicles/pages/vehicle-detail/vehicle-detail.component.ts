import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { CardDetailComponent } from '../../../../shared/cards/card-detail/card-detail.component';
import { MaterialModule } from '../../../../material/material.module';
import { Vehicle } from '../../interfaces/vehicle.model';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [MaterialModule, CardDetailComponent, RouterModule],
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.scss',
})
export class VehicleDetailComponent implements OnInit{

  @Input() vehicle!: Vehicle;

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService
  ){}

  ngOnInit(): void {
    const vehicleId = this.route.snapshot.paramMap.get('id');
    if (vehicleId) {
      this.vehicleService.getVehicleById(vehicleId).subscribe((data) => {
        this.vehicle = data;
      });
    }
  }

  onVehicleUpdated(updatedVehicle: Vehicle) {
    this.vehicle = updatedVehicle; 
  }
}
