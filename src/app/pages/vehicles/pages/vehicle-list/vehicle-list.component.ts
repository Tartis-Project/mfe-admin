import { Component, Input, OnInit } from '@angular/core';
import { CardViewComponent } from '../../../../shared/cards/card-view/card-view.component';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../interfaces/vehicle.model';
import { MaterialModule } from '../../../../material/material.module';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [MaterialModule, CardViewComponent],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss',
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];

  @Input() vehicle!: Vehicle;

  constructor(
    private vehicleService: VehicleService
  ){}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.vehicleService.getVehicles().subscribe({
      next: (data) => {
        console.log(data);
        this.vehicles = data;
      },
      error: (error) => {
        console.error('Error al cargar las tarifas:', error);
      },
    });
  }

}
