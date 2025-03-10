import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogComponent } from './confirm-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { computed } from '@angular/core';
import { VehicleService } from '../../pages/vehicles/services/vehicle.service';
import { of } from 'rxjs';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<ConfirmDialogComponent>>;


  const mockVehicle = {
    id: '1',
    licensePlate: 'ABC123',
    model: 'Toyota Corolla',
    vehicleType: 'Coche',
    color: 'Red',
    active: true,
  };

  const mockFloors = 
    {
      id: '8617',
      floorNumber: 1,
      numberOfSpots: 120,
      operative: true,
    }

    const mockRates = 
      {
        id: "35cd",
        name: "Estándar",
        pricePerMinute: 0.035
      }


  beforeEach(async () => {

    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    await TestBed.configureTestingModule({
      imports: [ConfirmDialogComponent, HttpClientTestingModule, MatDialogModule],
      providers:[
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { dialogData: {} } },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create isPlazas', () => {
    component.isPlazas = computed(() => true)
    component.ngOnInit()
  });

  it('should create isTarifas', () => {
    component.isTarifas = computed(() => true)
    component.ngOnInit()
  });



  it('should confirm isVehicles', () => {
    component.vehicle = mockVehicle
    component.isVehicles = computed(() => true);

    component.confirm();



  });

  it('should confirm isTarifas', () => {
    component.rate = mockRates
    component.isTarifas = computed(() => true);

    component.confirm();
  });

  it('should confirm isPlazas', () => {
    component.floor = mockFloors
    component.isPlazas = computed(() => true);


    component.confirm();


  });

  

  

  it('should call close when onNoClick() is called', () => {
    component.onNoClick();
    expect(dialogRef.close).toHaveBeenCalled();
  });
});
