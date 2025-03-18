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
import { ParkingSpot } from '../../interfaces/parkingSpot.model';
import { ParkingSpotService } from '../../services/parkingSpot.service';
import { forkJoin, switchMap } from 'rxjs';

@Component({
  selector: 'app-parking-form',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './parking-form.component.html',
  styleUrl: './parking-form.component.scss',
})
export class ParkingFormComponent implements OnInit {
  @Input() floor!: Floor;

  //parkingSpot!: ParkingSpot;
  arrayParkingSpot: ParkingSpot[] = [];

  public parkingForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CardFormComponent>,
    private fb: FormBuilder,
    private parkingService: ParkingService,
    private parkingSpotService: ParkingSpotService,
  ) {
    this.parkingForm = this.fb.group({
      id: [''],
      floorNumber: ['', [Validators.required, greaterThanZeroValidator()]],
      numberOfSpots: ['', [Validators.required, greaterThanZeroValidator()]],
      operative: [false],
    });
  }

  ngOnInit(): void {
    if (this.floor) {
      this.parkingForm.reset(this.floor);
      console.log(this.parkingForm.value);
    }
  }

  // addFloor() {
  //   if (this.parkingForm.valid) {
  //     const newFloor = this.parkingForm.value;
  //     this.parkingSpotService
  //       .getLastSpotNumber()
  //       .subscribe((lastSpotNumber) => {
  //         console.log('Último número de plaza:', lastSpotNumber);
  //         this.parkingService.addFloor(newFloor).subscribe((res) => {
  //           this.onNoClick();
  //           console.log('idPlanta ' + res.id);
  //           const parkingSpots: ParkingSpot[] = [];
  //           for (let index = 0; index < newFloor.numberOfSpots; index++) {
  //             const auxSpot = {
  //               idFloor: res.id,
  //               spotNumber: lastSpotNumber + index + 1,
  //               occupied: false,
  //             } as ParkingSpot;
  //             parkingSpots.push(auxSpot);
  //           }
  //           const addSpotRequests = parkingSpots.map((spot) =>
  //             this.parkingSpotService.addParkingSpot(spot),
  //           );
  //           forkJoin(addSpotRequests).subscribe({
  //             next: (responses) => {
  //               console.log('Todas las plazas añadidas:', responses);
  //             },
  //             error: (err) => {
  //               console.error('Error al añadir una o más plazas:', err);
  //             },
  //           });
  //         });
  //       });
  //   }
  // }

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
