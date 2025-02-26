import { Component, inject, Input } from '@angular/core';
import { MaterialModule } from '../../../../material/material.module';
import { MatDialogRef } from '@angular/material/dialog';
import { CardFormComponent } from '../../../../shared/cards/card-form/card-form.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-parking-form',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './parking-form.component.html',
  styleUrl: './parking-form.component.scss'
})
export class ParkingFormComponent {
readonly dialogRef = inject(MatDialogRef<CardFormComponent> );

  @Input() floor:any;

  public fb = inject(FormBuilder)

  public parkingForm: FormGroup = this.fb.group({
    floor: [2],
    places: [120],
    operative: [true]
  })


  onNoClick(): void {
    this.dialogRef.close(
      console.log(this.floor)
    );
  }
}
