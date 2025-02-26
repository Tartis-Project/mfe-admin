import { Component, signal, computed, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { MaterialModule } from '../../../material/material.module';
import { CardFormComponent } from '../card-form/card-form.component';
import { Floor } from '../../../pages/parking/interfaces/floor.model';
import { ParkingService } from '../../../pages/parking/services/parking.service';
import { Rate } from '../../../pages/rates/interfaces/rates.model';
import { RateService } from '../../../pages/rates/services/rates.service';


@Component({
  selector: 'app-card-view',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './card-view.component.html',
  styleUrl: './card-view.component.scss'
})
export class CardViewComponent implements OnInit {

  constructor(
    private router: Router,
    readonly dialog: MatDialog,
    private parkingService: ParkingService,
    private ratesService: RateService
  ) {

  }

  @Input() floor!: Floor
  @Input() rate!: Rate;
  @Output() eventLoad = new EventEmitter<void>();

  totalPorHora = 0;

  currentRoute = computed(() => this.router.url);
  isPlazas = computed(() => this.currentRoute().includes('/parking'));
  isTarifas = computed(() => this.currentRoute().includes('/rates'));
  isVehicles = computed(() => this.currentRoute().includes('/vehicles'));

  isOperative = signal<boolean>(true);

  ngOnInit(): void {
    this.totalPorHora = this.rate.pricePerMinute * 60;
  }

  toggleOperative(): void {
    this.isOperative.update(value => !value);
  }

  openDialog(): void {
    let dialogData: any = {};

    switch (true) {
      case this.isPlazas():
        dialogData = this.floor;
        break;
      case this.isTarifas():
        dialogData = this.rate;
        break;
      case this.isVehicles():
        dialogData = { brand: "seat" };
        break;
      default:
        dialogData = {};
        break;
    }

    let dialogRef = this.dialog.open(CardFormComponent, {
      width: '50%',
      height: 'auto',
      data: { dialogData },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.eventLoad.emit()
    });
  }

  viewVehicleDetail(): void {
    console.log("Ver detalles del vehículo...");
  }

  deleteAction() {
    switch (true) {
      case this.isPlazas():
        this.parkingService.deleteFloor(this.floor.id).subscribe(res => {
          this.eventLoad.emit()
        })
        break;
      case this.isTarifas():
        // this.ratesService.deleteRates(this.rates.id).subscribe(res => {
        // })
        break;
      case this.isVehicles():
        break;
      default:
        break;
    }
  }
}
