import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';

import { CardViewComponent } from '../../../../shared/cards/card-view/card-view.component';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../interfaces/vehicle.model';
import { MaterialModule } from '../../../../material/material.module';
import { SearchVehiclePipe } from '../../../../core/pipes/search-vehicle.pipe';
import { RegistryService } from '../../../../shared/registry/services/registry.service';
import { Registry } from '../../../../shared/registry/interfaces/registry.model';
import { OrderVehiclePipe } from '../../../../core/pipes/order-vehicle.pipe';


@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [
    CardViewComponent,
    MaterialModule,
    ReactiveFormsModule,
    SearchVehiclePipe,
    OrderVehiclePipe
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
  registries: Registry[] = [];
  currentPageActive: number = 0;
  currentPageInactive: number = 0;
  pageSizeActive: number = 8;
  pageSizeInactive: number = 8;
  active: boolean = true;
  isInactive: boolean = true;
  isOpen = false;
  isOpenState = false;

  constructor(
    private vehicleService: VehicleService,
    private fb: FormBuilder,
    private registryService: RegistryService,
  ) {
    this.filterForm = this.fb.group({
      search: [''],
      state: ['active'],
      order: ['new']
    });
  }

  ngOnInit(): void {
    this.loadVehicles();
    this.loadRegistries()
    this.filterForm.valueChanges.subscribe((changes) => {
      this.filterVehicles(changes);
    });
  }

  toggleSelect() {
    this.isOpen = !this.isOpen;
  }

  toggleSelectState(){
    this.isOpenState = !this.isOpenState;
  }

  loadVehicles() {
    this.vehicleService.getVehicles().subscribe((res) => {
      this.vehiclesInactive = res.filter((v) => !v.active);
      this.vehiclesActive = res.filter((v) => v.active);
      this.filterVehicles(this.filterForm.value);
    });
  }

  loadRegistries(){
    this.registryService.getRegistries().subscribe(res => {
      this.registries = res;
    })
  }

  filterVehicles(filters: any) {
    const { search, state } = filters;

    switch (state) {
      case 'active':
        this.active = true;
        this.isInactive = false;
        break;
      case 'inactive':
        this.active = false;
        this.isInactive = true;
        break;
      default:
        this.active = true;
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
    this.filterForm.reset({ search: '', state: 'active', order: 'new' });
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
