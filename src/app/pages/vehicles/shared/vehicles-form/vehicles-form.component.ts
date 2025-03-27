import {
  Component,
  EventEmitter,
  Inject,
  inject,
  Input,
  Output,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CardFormComponent } from '../../../../shared/cards/card-form/card-form.component';
import { MaterialModule } from '../../../../material/material.module';
import { Vehicle } from '../../interfaces/vehicle.model';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicles-form',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './vehicles-form.component.html',
  styleUrl: './vehicles-form.component.scss',
})
export class VehiclesFormComponent {
  readonly dialogRef = inject(MatDialogRef<CardFormComponent>);

  @Input() vehicle!: Vehicle;
  @Output() vehicleUpdated = new EventEmitter<Vehicle>();

  public fb = inject(FormBuilder);
  public vehicleForm!: FormGroup;

  constructor(
    private vehicleService: VehicleService,
    @Inject(MAT_DIALOG_DATA) public data: { dialogData: any },
  ) {
    if (data.dialogData != undefined || data == null) {
      this.vehicle = data.dialogData;
    }

    this.vehicleForm = this.fb.group({
      licensePlate: [this.vehicle.licensePlate, Validators.required],
      model: [this.vehicle.model, Validators.required],
      vehicleType: [this.vehicle.vehicleType.toUpperCase(), Validators.required],
      color: [this.vehicle.color, Validators.required],
      active: [this.vehicle.active],
    });
    console.log('Vehicle:', this.vehicle.vehicleType);
  }


  updateVehicle() {
    const updatedVehicle = this.vehicleForm.value;
    this.vehicleService
      .updateVehicle(this.vehicle.id, updatedVehicle)
      .subscribe((res) => {
        this.vehicleUpdated.emit(updatedVehicle);
        this.onNoClick();
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
