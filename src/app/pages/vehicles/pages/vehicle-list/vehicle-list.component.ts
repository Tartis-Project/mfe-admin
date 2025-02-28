import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CardViewComponent } from '../../../../shared/cards/card-view/card-view.component';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../interfaces/vehicle.model';
import { MaterialModule } from '../../../../material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CardViewComponent, MaterialModule, ReactiveFormsModule],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntl }
  ],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss',
})
export class VehicleListComponent implements OnInit{

  public filterForm: FormGroup;
  allVehicles: Vehicle[] = [];
  vehiclesFilter: Vehicle[] = [];
  vehiclesActive: Vehicle[] = []
  vehiclesInactive: Vehicle[] = []
  currentPage: number = 0;
  pageSize: number = 8;
  pageSizeState: number = 8
  isActive: boolean = true;
  isInactive: boolean = true;

  constructor(private vehicleService: VehicleService, private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.filterForm = this.fb.group({
      search: [''],
      state: ['active'],
    });
  }

  ngOnInit(): void {
    this.loadVehicles();
    this.filterForm.valueChanges.subscribe(changes => {
      this.filterVehicles(changes);
    });
    // this.onPageChange()
  }

  loadVehicles() {
    this.vehicleService.getVehicles().subscribe(res => {
      this.allVehicles = res;
      this.vehiclesInactive = this.allVehicles.filter(v => !v.isActive)
      this.vehiclesActive = this.allVehicles.filter(v => v.isActive)
      this.filterVehicles(this.filterForm.value);
    });
  }

  filterVehicles(filters: any) {
    const { search, state } = filters;

    this.pageSizeState = this.pageSize
    switch(state){
      case('active'):
        this.vehiclesFilter = [...this.allVehicles.filter(v => v.isActive)]
        this.isActive = true;
        this.isInactive = false;
      break;
      case('inactive'):
      this.vehiclesFilter = [...this.allVehicles.filter(v => !v.isActive)]
      this.isActive = false;
      this.isInactive = true;
      break;
      default:
        this.vehiclesFilter = [...this.allVehicles]
        this.isActive = true;
        this.isInactive = true;
        this.pageSizeState = this.pageSize / 2

      break;
    }
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.pageSizeState = this.pageSize
    console.log(event)
    if (this.filterForm.value.state === 'all') {
      this.pageSizeState = this.pageSize / 2
    }
  }

  cleanFilter() {
    this.filterForm.reset({ search: '', state: 'active' });
    this.currentPage = 0;
    this.pageSize = this.pageSizeState = 8;  // Restablecer el tamaño de la página a su valor inicial (puedes cambiarlo a cualquier tamaño predeterminado que prefieras)

      let pageEvent: PageEvent = {
        pageIndex: 0,
        pageSize: this.pageSize, // Tamaño de la página
        length: this.vehiclesFilter.length  // Total de vehículos

      };

      this.onPageChange(pageEvent);

      this.cdr.detectChanges();

  }

  get totalVehicles(): number {
    return this.vehiclesFilter.length;
  }


}
