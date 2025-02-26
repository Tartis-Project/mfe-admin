import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { CardFormComponent } from '../../../../shared/cards/card-form/card-form.component';
import { MaterialModule } from '../../../../material/material.module';
import { RateService } from '../../services/rates.service';
import { Rate } from '../../interfaces/rates.model';

@Component({
  selector: 'app-rates-form',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './rates-form.component.html',
  styleUrl: './rates-form.component.scss'
})
export class RatesFormComponent {

  @Input() rate!: Rate;

  public ratesForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CardFormComponent>,
    private fb: FormBuilder,
    private ratesService: RateService
  ){
    this.ratesForm = this.fb.group({
      name: [""],
      pricePerMinute: [],
    })
  }

  addRate() {
    const rateData: Rate = this.ratesForm.value;
    this.ratesService.createRate(rateData).subscribe({
      next: (response) => {
        console.log('Tarifa creada exitosamente:', response);
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error al crear la tarifa:', error);
      },
    });
  }

  onNoClick(): void {
    this.dialogRef.close(
      console.log()
    );
  }
}
