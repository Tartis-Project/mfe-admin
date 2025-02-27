import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { CardFormComponent } from '../../../../shared/cards/card-form/card-form.component';
import { MaterialModule } from '../../../../material/material.module';
import { RateService } from '../../services/rates.service';
import { Rate } from '../../interfaces/rates.model';

@Component({
  selector: 'app-rates-form',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './rates-form.component.html',
  styleUrl: './rates-form.component.scss',
})
export class RatesFormComponent implements OnInit {
  @Input() rate!: Rate;

  public ratesForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CardFormComponent>,
    private fb: FormBuilder,
    private ratesService: RateService
  ) {
    this.ratesForm = this.fb.group({
      name: ['', Validators.required],
      pricePerMinute: [
        '',
        [Validators.required, Validators.pattern(/^\d*\.?\d+$/)],
      ],
    });
  }

  ngOnInit(): void {
    if (this.rate) {
      this.ratesForm.reset(this.rate);
      console.log(this.ratesForm.value);
    }
  }

  addRate() {
    if (this.ratesForm.valid) {
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
  }

  updateRate() {
    const updatedRate = this.ratesForm.value;
    this.ratesService.updateRate(this.rate.id, updatedRate).subscribe((res) => {
      console.log(res);
      this.onNoClick();
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
