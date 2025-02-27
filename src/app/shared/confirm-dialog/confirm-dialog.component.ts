import { Component, computed, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { Floor } from '../../pages/parking/interfaces/floor.model';
import { Rate } from '../../pages/rates/interfaces/rates.model';
import { ParkingService } from '../../pages/parking/services/parking.service';
import { RateService } from '../../pages/rates/services/rates.service';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent implements OnInit {
  constructor(
    private parkingService: ParkingService,
    private rateService: RateService,
    readonly dialogRef: MatDialogRef<ConfirmDialogComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { dialogData: any },
  ) {}

  floor!: Floor;
  rate!: Rate;

  currentRoute = computed(() => this.router.url);
  isPlazas = computed(() => this.currentRoute().includes('/parking'));
  isTarifas = computed(() => this.currentRoute().includes('/rates'));
  isVehicles = computed(() => this.currentRoute().includes('/vehicles'));

  ngOnInit(): void {
    switch (true) {
      case this.isPlazas():
        this.floor = this.data.dialogData;
        break;
      case this.isTarifas():
        this.rate = this.data.dialogData;
        break;
      case this.isVehicles():
        brand: 'seat';
        break;
      default:
        this.onNoClick();
        break;
    }
  }

  confirm() {
    switch (true) {
      case this.isPlazas():
        this.parkingService.deleteFloor(this.floor.id).subscribe(() => {
          this.onNoClick();
        });
        break;
      case this.isTarifas():
        this.rateService.deleteRate(this.rate.id).subscribe(() => {
          this.onNoClick();
        });
        break;
      case this.isVehicles():
        break;
      default:
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
