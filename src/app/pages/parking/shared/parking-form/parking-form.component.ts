import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MaterialModule } from '../../../../material/material.module';
import { MatDialogRef } from '@angular/material/dialog';
import { CardFormComponent } from '../../../../shared/cards/card-form/card-form.component';
import { ParkingService } from '../../services/parking.service';
import { Floor } from '../../interfaces/floor.model';
import { greaterThanZeroValidator } from '../../../../core/validators/greater-than-zero.validator';

@Component({
  selector: 'app-parking-form',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './parking-form.component.html',
  styleUrl: './parking-form.component.scss',
})
export class ParkingFormComponent implements OnInit {
  @Input() floor!: Floor;
  public parkingForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CardFormComponent>,
    private fb: FormBuilder,
    private parkingService: ParkingService
  ) {
    this.parkingForm = this.fb.group({
      number: ['', [Validators.required, greaterThanZeroValidator()]],
      numberOfSpots: ['', [Validators.required, greaterThanZeroValidator()]],
      isOperative: [false],
    });
  }

  ngOnInit(): void {
    if (this.floor) {
      this.parkingForm.reset(this.floor);
      console.log(this.parkingForm.value);
    }
  }

  addFloor() {
    if (this.parkingForm.valid) {
      const newFloor = this.parkingForm.value;
      console.log(newFloor);
      this.parkingService.addFloor(newFloor).subscribe((res) => {
        console.log(res);
        this.onNoClick();
      });
    }
  }

  updateFloor() {
    const updatedFloor = this.parkingForm.value;
    this.parkingService
      .updateFloor(this.floor.id, updatedFloor)
      .subscribe((res) => {
        console.log(res);
        this.onNoClick();
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
