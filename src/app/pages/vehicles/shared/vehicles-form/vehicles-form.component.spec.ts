import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehiclesFormComponent } from './vehicles-form.component'; // Import the standalone component
import { MaterialModule } from '../../../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../interfaces/vehicle.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('VehiclesFormComponent', () => {
  let component: VehiclesFormComponent;
  let fixture: ComponentFixture<VehiclesFormComponent>;
  let vehicleService: jasmine.SpyObj<VehicleService>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<VehiclesFormComponent>>;

  const mockVehicle: Vehicle = {
    id: '1',
    licensePlate: 'ABC123',
    model: 'Sedan',
    vehicleType: 'Car',
    color: 'Red',
    active: true,
  };

  beforeEach(async () => {
    const vehicleServiceSpy = jasmine.createSpyObj('VehicleService', [
      'updateVehicle',
    ]);
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        VehiclesFormComponent, // Standalone component
      ],
      providers: [
        { provide: VehicleService, useValue: vehicleServiceSpy },
        { provide: MAT_DIALOG_DATA, useValue: { dialogData: mockVehicle } },
        { provide: MatDialogRef, useValue: mockDialogRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VehiclesFormComponent);
    component = fixture.componentInstance;
    vehicleService = TestBed.inject(
      VehicleService,
    ) as jasmine.SpyObj<VehicleService>;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with vehicle data', () => {
    expect(component.vehicleForm.get('licensePlate')?.value).toBe('ABC123');
    expect(component.vehicleForm.get('model')?.value).toBe('Sedan');
    expect(component.vehicleForm.get('color')?.value).toBe('Red');
    expect(component.vehicleForm.get('active')?.value).toBe(true);
  });

  it('should call updateVehicle when updating the vehicle', () => {
    const updatedVehicle: Vehicle = { ...mockVehicle, color: 'Blue' };
    vehicleService.updateVehicle.and.returnValue(of(updatedVehicle));

    component.vehicleForm.patchValue({ color: 'Blue' });
    component.updateVehicle();

    expect(vehicleService.updateVehicle).toHaveBeenCalledWith(
      '1',
      jasmine.objectContaining({ color: 'Blue' }),
    );
  });

  it('should emit the updated vehicle after successful update', () => {
    const updatedVehicle: Vehicle = { ...mockVehicle, color: 'Blue' };
    vehicleService.updateVehicle.and.returnValue(of(updatedVehicle));
    spyOn(component.vehicleUpdated, 'emit');

    component.vehicleForm.patchValue({ color: 'Blue' });
    component.updateVehicle();

    expect(component.vehicleUpdated.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({ color: 'Blue' }),
    );
  });

  it('should close the dialog when onNoClick() is called', () => {
    component.onNoClick();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
