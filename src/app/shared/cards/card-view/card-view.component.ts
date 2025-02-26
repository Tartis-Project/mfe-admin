import { Component, inject, signal, computed } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { CardFormComponent } from '../card-form/card-form.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-card-view',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './card-view.component.html',
  styleUrl: './card-view.component.scss'
})
export class CardViewComponent {
  readonly dialog = inject(MatDialog);
  private router = inject(Router);

  currentRoute = computed(() => this.router.url);
  isPlazas = computed(() => this.currentRoute().includes('/parking'));
  isTarifas = computed(() => this.currentRoute().includes('/rates'));
  isVehicles = computed(() => this.currentRoute().includes('/vehicles'));

  isOperative = signal<boolean>(true);

  totalPorHora = computed(() => (0.035 * 60).toFixed(2));

  toggleOperative(): void {
    this.isOperative.update(value => !value);
  }

  openDialog(): void {
    this.dialog.open(CardFormComponent, {
      width: '50%',
      height: 'auto',
      data: { floor: 1, places: 120, operative: this.isOperative() },
    });
  }

  viewVehicleDetail(): void {
    console.log("Ver detalles del vehículo...");
  }
}
