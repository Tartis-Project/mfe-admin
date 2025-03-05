import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';

import { CardViewComponent } from '../../../../shared/cards/card-view/card-view.component';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../interfaces/vehicle.model';
import { MaterialModule } from '../../../../material/material.module';
import { SearchVehiclePipe } from '../../../../core/pipes/search-vehicle.pipe';


@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [
    CardViewComponent,
    MaterialModule,
    ReactiveFormsModule,
    SearchVehiclePipe,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntl }],

  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss',
  encapsulation: ViewEncapsulation.None

})
export class VehicleListComponent implements OnInit {

  public filterForm: FormGroup;
  vehiclesActive: Vehicle[] = [];
  vehiclesInactive: Vehicle[] = [];
  currentPageActive: number = 0;
  currentPageInactive: number = 0;
  pageSizeActive: number = 8;
  pageSizeInactive: number = 8;
  isActive: boolean = true;
  isInactive: boolean = true;
  isOpen = false;

  constructor(
    private vehicleService: VehicleService,
    private fb: FormBuilder,
  ) {
    this.filterForm = this.fb.group({
      search: [''],
      state: ['active'],
    });
  }

  ngOnInit(): void {
    this.loadVehicles();
    this.filterForm.valueChanges.subscribe((changes) => {
      this.filterVehicles(changes);
    });
  }

  toggleSelect() {
    this.isOpen = !this.isOpen;
  }

  loadVehicles() {
    this.vehicleService.getVehicles().subscribe((res) => {
      this.vehiclesInactive = res.filter((v) => !v.isActive);
      this.vehiclesActive = res.filter((v) => v.isActive);
      this.filterVehicles(this.filterForm.value);
    });
  }

  filterVehicles(filters: any) {
    const { search, state } = filters;

    switch (state) {
      case 'active':
        this.isActive = true;
        this.isInactive = false;
        break;
      case 'inactive':
        this.isActive = false;
        this.isInactive = true;
        break;
      default:
        this.isActive = true;
        this.isInactive = true;

        break;
    }
  }

  onPageInactiveChange(event: PageEvent): void {
    this.currentPageInactive = event.pageIndex;
    this.pageSizeInactive = event.pageSize;
  }

  onPageActiveChange(event: PageEvent): void {
    this.currentPageActive = event.pageIndex;
    this.pageSizeActive = event.pageSize;
  }

  cleanFilter() {
    this.filterForm.reset({ search: '', state: 'active' });
    this.currentPageActive = this.currentPageInactive = 0;
    this.pageSizeActive = this.pageSizeInactive = 8;

    let pageEvent: PageEvent = {
      pageIndex: 0,
      pageSize: this.pageSizeActive,
      length: this.vehiclesActive.length,
    };

    this.onPageInactiveChange(pageEvent);
    this.onPageActiveChange(pageEvent);

  }
}
