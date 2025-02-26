import { Component, inject, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CardFormComponent } from '../../../../shared/cards/card-form/card-form.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material/material.module';

@Component({
  selector: 'app-vehicles-form',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './vehicles-form.component.html',
  styleUrl: './vehicles-form.component.scss'
})
export class VehiclesFormComponent {
readonly dialogRef = inject(MatDialogRef<CardFormComponent> );

  @Input() vehicle:any;

  public fb = inject(FormBuilder)

  public vehicleForm: FormGroup = this.fb.group({
    brand: [""],
    model: [""],
    license: [""],
    color: [""],
    doors: [],
  })


  onNoClick(): void {
    this.dialogRef.close(
      console.log()
    );
  }
}
