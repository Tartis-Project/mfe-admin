import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CardViewComponent } from '../../../../shared/cards/card-view/card-view.component';
import { RateService } from '../../services/rates.service';
import { Rate } from '../../interfaces/rates.model';
import { MaterialModule } from '../../../../material/material.module';
import { CardFormComponent } from '../../../../shared/cards/card-form/card-form.component';

@Component({
  selector: 'app-rates',
  standalone: true,
  imports: [MaterialModule, CardViewComponent],
  templateUrl: './rates.component.html',
  styleUrl: './rates.component.scss',
})
export class RatesComponent implements OnInit {
  rates: Rate[] = [];

  constructor(private ratesService: RateService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadRates();
  }

  loadRates(): void {
    this.ratesService.getRates().subscribe({
      next: (data) => {
        this.rates = data;
      },
      error: (error) => {
        console.error('Error al cargar las tarifas:', error);
      },
    });
  }

  openDialog(): void {
    let dialogData: any = {};
    let dialogRef = this.dialog.open(CardFormComponent, {
      width: '50%',
      height: 'auto',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadRates();
    });
  }
}
