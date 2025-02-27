import { Component, computed, Inject } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ParkingFormComponent } from '../../../pages/parking/shared/parking-form/parking-form.component';
import { RatesFormComponent } from '../../../pages/rates/shared/rates-form/rates-form.component';
import { VehiclesFormComponent } from '../../../pages/vehicles/shared/vehicles-form/vehicles-form.component';
import { Floor } from '../../../pages/parking/interfaces/floor.model';
import { Rate } from '../../../pages/rates/interfaces/rates.model';
import { Vehicle } from '../../../pages/vehicles/interfaces/vehicle.model';

@Component({
  selector: 'app-card-form',
  standalone: true,
  imports: [
    MaterialModule,
    ParkingFormComponent,
    RatesFormComponent,
    VehiclesFormComponent,
  ],
  templateUrl: './card-form.component.html',
  styleUrl: './card-form.component.scss',
})
export class CardFormComponent {
  currentRoute = computed(() => this.router.url);
  isPlazas = computed(() => this.currentRoute().includes('/parking'));
  isTarifas = computed(() => this.currentRoute().includes('/rates'));
  isVehicles = computed(() => this.currentRoute().includes('/vehicles'));
  public floor!: Floor;
  public vehicle!: Vehicle;
  public rate!: Rate;

  constructor(
    readonly dialogRef: MatDialogRef<CardFormComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { dialogData: any },
  ) {
    if (data.dialogData != undefined || data == null) {
      this.floor = data.dialogData;
      this.vehicle = data.dialogData;
      this.rate = data.dialogData;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
