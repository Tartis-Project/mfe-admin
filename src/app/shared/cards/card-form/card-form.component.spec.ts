import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../../material/material.module';
import { ParkingFormComponent } from '../../../pages/parking/shared/parking-form/parking-form.component';
import { RatesFormComponent } from '../../../pages/rates/shared/rates-form/rates-form.component';
import { VehiclesFormComponent } from '../../../pages/vehicles/shared/vehicles-form/vehicles-form.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { of, Subject } from 'rxjs';
import { Vehicle } from '../../../pages/vehicles/interfaces/vehicle.model';
import { Rate } from '../../../pages/rates/interfaces/rates.model';
import { Floor } from '../../../pages/parking/interfaces/floor.model';
import { CardFormComponent } from './card-form.component';

// Mock de Router
class MockRouter {
  navigate = jasmine.createSpy('navigate');
  events: Subject<any> = new Subject(); // Usamos un Subject para emitir eventos
}

describe('CardFormComponent', () => {
  let component: CardFormComponent;
  let fixture: ComponentFixture<CardFormComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<CardFormComponent>>;
  let mockRouter: MockRouter;

  const mockFloor: Floor = {
    id: '1',
    floorNumber: 34,
    numberOfSpots: 5,
    operative: true,
  };

  const mockRate: Rate = {
    pricePerMinute: 1,
    id: 'rate1',
    description: 'Hourly rate',
  };

  const mockVehicle: Vehicle = {
    id: '1',
    licensePlate: 'ABC123',
    model: 'CarModel',
    vehicleType: 'SUV',
    color: 'Blue',
    active: true,
  };

  beforeEach(() => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockRouter = new MockRouter(); // Creamos la instancia del MockRouter
    
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        CardFormComponent, // Importamos el componente standalone aquí
        ParkingFormComponent,
        RatesFormComponent,
        VehiclesFormComponent
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: MAT_DIALOG_DATA, useValue: { dialogData: mockFloor } }, // Inyectando mockFloor en dialogData
        { provide: MatDialogRef, useValue: dialogRefSpy },
        Location
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CardFormComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });



  it('should close the dialog on onNoClick()', () => {
    component.onNoClick();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should close dialog with updated vehicle data on onVehicleUpdated()', () => {
    const updatedVehicle = {  id: '1',
      licensePlate: 'ABC123',
      model: 'CarModel',
      vehicleType: 'SUV',
      color: 'Blue',
      active: true,};
    component.onVehicleUpdated(updatedVehicle);
    expect(dialogRefSpy.close).toHaveBeenCalledWith(updatedVehicle);
  });

});
