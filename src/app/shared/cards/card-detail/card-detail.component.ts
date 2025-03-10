import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Vehicle } from '../../../pages/vehicles/interfaces/vehicle.model';
import { MaterialModule } from '../../../material/material.module';
import { CardFormComponent } from '../card-form/card-form.component';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { VehicleService } from '../../../pages/vehicles/services/vehicle.service';
import { Registry } from '../../registry/interfaces/registry.model';
import { Rate } from '../../../pages/rates/interfaces/rates.model';
import { ParkingSpot } from '../../../pages/parking/interfaces/parkingSpot.model';

@Component({
  selector: 'app-card-detail',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.scss',
})
export class CardDetailComponent {
  @Input() vehicle!: Vehicle;
  @Input() registry?: Registry;
  @Output() vehicleUpdated = new EventEmitter<Vehicle>();

  @Input() rate?: Rate;
  @Input() parkingSpot?: ParkingSpot;

  constructor(
    private vehicleService: VehicleService,
    readonly dialog: MatDialog,
  ) {
    console.log(this.registry, this.vehicle);
  }

  openDialog(): void {
    let dialogData: any = {};

    dialogData = this.vehicle;

    let dialogRef = this.dialog.open(CardFormComponent, {
      width: '50%',
      height: 'auto',
      data: { dialogData },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.vehicleService.getVehicleById(dialogData.id).subscribe({
        next: (updatedVehicle) => {
          if (updatedVehicle) {
            this.vehicleUpdated.emit(updatedVehicle);
          }
        },
        error: (error) => {
          console.error('Error al obtener el vehículo:', error);
        },
        complete: () => {
          console.log('Llamada a getVehicleById completada');
        },
      });
    });
  }

  openDialogDelete(dialogData: any): void {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '50%',
      height: 'auto',
      data: { dialogData },
    });
  }

  deleteAction() {
    this.openDialogDelete(this.vehicle);
  }
}
