import { Component, computed, Inject, inject } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ParkingFormComponent } from "../../../pages/parking/shared/parking-form/parking-form.component";
import { Router } from '@angular/router';
import { RatesFormComponent } from "../../../pages/rates/shared/rates-form/rates-form.component";
import { VehiclesFormComponent } from "../../../pages/vehicles/shared/vehicles-form/vehicles-form.component";


@Component({
  selector: 'app-card-form',
  standalone: true,
  imports: [MaterialModule, ParkingFormComponent, RatesFormComponent, VehiclesFormComponent],
  templateUrl: './card-form.component.html',
  styleUrl: './card-form.component.scss'
})
export class CardFormComponent {
  readonly dialogRef = inject(MatDialogRef<CardFormComponent> );
  private router = inject(Router);

  currentRoute = computed(() => this.router.url);
  isPlazas = computed(() => this.currentRoute().includes('/parking'));
  isTarifas = computed(() => this.currentRoute().includes('/rates'));
  isVehicles = computed(() => this.currentRoute().includes('/vehicles'));
  public floor: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {floor: number, places: number, operative: boolean}) {
    this.floor = data;
   }



  onNoClick(): void {
    this.dialogRef.close(
      console.log(this.data)
    );
  }
}
