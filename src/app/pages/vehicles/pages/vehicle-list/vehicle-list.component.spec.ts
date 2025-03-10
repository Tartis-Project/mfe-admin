import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { VehicleListComponent } from './vehicle-list.component';
import { VehicleService } from '../../services/vehicle.service';
import { RegistryService } from '../../../../shared/registry/services/registry.service';
import { of } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('VehicleListComponent', () => {
  let component: VehicleListComponent;
  let fixture: ComponentFixture<VehicleListComponent>;
  let vehicleService: jasmine.SpyObj<VehicleService>;
  let registryService: jasmine.SpyObj<RegistryService>;

  beforeEach(async () => {
    const vehicleServiceSpy = jasmine.createSpyObj('VehicleService', ['getVehicles']);
    const registryServiceSpy = jasmine.createSpyObj('RegistryService', ['getRegistries']);
    vehicleServiceSpy.getVehicles.and.returnValue(of([]));
    registryServiceSpy.getRegistries.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [VehicleListComponent, MatPaginatorModule, BrowserAnimationsModule],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: VehicleService, useValue: vehicleServiceSpy },
        { provide: RegistryService, useValue: registryServiceSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleListComponent);
    component = fixture.componentInstance;
    vehicleService = TestBed.inject(VehicleService) as jasmine.SpyObj<VehicleService>;
    registryService = TestBed.inject(RegistryService) as jasmine.SpyObj<RegistryService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load vehicles on init', fakeAsync(() => {
    const mockVehicles = [
      {
        id: "1",
        licensePlate: "ABC123",
        model: "Toyota Corolla",
        vehicleType: "Coche",
        color: "Red",
        active: true
      },
      {
        id: "2",
        licensePlate: "XYZ789",
        model: "Honda Civic",
        vehicleType: "Coche",
        color: "Blue",
        active: false
      },
    ];
    vehicleService.getVehicles.and.returnValue(of(mockVehicles));

    component.ngOnInit();
    tick();
    fixture.detectChanges();

    expect(component.vehiclesActive.length).toBe(1);
    expect(component.vehiclesInactive.length).toBe(1);
  }));

  it('should load registries on init', fakeAsync(() => {
    const mockRegistries = [{
      id: "3716e4e5-1f0a-41df-8f83-48ed8cc51c8e",
      idParkingSpot: "59",
      idVehicle: "3",
      idRate: "35cd",
      entryTime: new Date("2025-02-24 15:39:27.612800"),
      exitTime: new Date("NaT"),
      amount: 0
    },
    {
      id: "5e9a8939-cad9-4b4c-bf3b-c17ea71fb869",
      idParkingSpot: "263",
      idVehicle: "2",
      idRate: "35cd",
      entryTime: new Date("2025-02-24 15:39:27.612800"),
      exitTime: new Date("NaT"),
      amount: 0
    },];
    registryService.getRegistries.and.returnValue(of(mockRegistries));

    component.ngOnInit();
    tick();
    fixture.detectChanges();

    expect(component.registries.length).toBe(2);
  }));

  it('should toggle isOpen', () => {
    expect(component.isOpen).toBeFalse();
    component.toggleSelect();
    expect(component.isOpen).toBeTrue();
    component.toggleSelect();
    expect(component.isOpen).toBeFalse();
  });

  it('should toggle isOpenState', () => {
    expect(component.isOpenState).toBeFalse();
    component.toggleSelectState();
    expect(component.isOpenState).toBeTrue();
    component.toggleSelectState();
    expect(component.isOpenState).toBeFalse();
  });

  it('should apply filters correctly', () => {
    component.filterForm.setValue({ search: '', state: 'inactive', order: 'new' });
    component.filterVehicles(component.filterForm.value);
    expect(component.active).toBeFalse();
    expect(component.isInactive).toBeTrue();
  });

  it('should reset filters', () => {
    component.filterForm.setValue({ search: 'test', state: 'inactive', order: 'old' });
    component.cleanFilter();
    expect(component.filterForm.value).toEqual({ search: '', state: 'active', order: 'new' });
  });
});