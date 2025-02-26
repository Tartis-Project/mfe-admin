import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MaterialModule } from '../../../../material/material.module';
import { MatDialogRef } from '@angular/material/dialog';
import { CardFormComponent } from '../../../../shared/cards/card-form/card-form.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ParkingService } from '../../services/parking.service';
import { Floor } from '../../interfaces/floor.model';

@Component({
  selector: 'app-parking-form',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './parking-form.component.html',
  styleUrl: './parking-form.component.scss'
})
export class ParkingFormComponent implements OnInit{


  @Input() floor!:Floor;
  public parkingForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CardFormComponent>,
    private fb: FormBuilder,
    private parkingService: ParkingService
  ) {
    this.parkingForm = this.fb.group({
      number: [],
      numberOfSpots: [],
      isOperative: [false]
    });
  }

  ngOnInit(): void {
    if(this.floor){
      this.parkingForm.reset(this.floor)
      console.log(this.parkingForm.value)
    }

  }

  addFloor(){
    const newFloor = this.parkingForm.value
    console.log(newFloor)
    this.parkingService.addFloor(newFloor).subscribe(res => {
      console.log(res)
      this.onNoClick()
    })
  }

  updateFloor(){
    const updatedFloor = this.parkingForm.value
    this.parkingService.updateFloor(this.floor.id, updatedFloor).subscribe(res => {
      console.log(res)
      this.onNoClick()
    })
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}


