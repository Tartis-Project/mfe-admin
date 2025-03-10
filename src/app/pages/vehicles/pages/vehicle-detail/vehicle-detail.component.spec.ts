import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { VehicleDetailComponent } from './vehicle-detail.component'; // Standalone Component
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { ParkingSpotService } from '../../../parking/services/parkingSpot.service';
import { RateService } from '../../../rates/services/rates.service';
import { RegistryService } from '../../../../shared/registry/services/registry.service';
import { MaterialModule } from '../../../../material/material.module';
import { CardDetailComponent } from '../../../../shared/cards/card-detail/card-detail.component';
import { RouterModule } from '@angular/router';
import { Rate } from '../../../rates/interfaces/rates.model';
import { ParkingSpot } from '../../../parking/interfaces/parkingSpot.model';
import { Registry } from '../../../../shared/registry/interfaces/registry.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Mock services
class MockVehicleService {
  getVehicleById(id: string) {
    return of({ 
      id, 
      licensePlate: 'ABC123', 
      model: 'Model X', 
      vehicleType: 'SUV', 
      color: 'Red', 
      active: true 
    });
  }
}

class MockParkingSpotService {
  getParkingSpotById(id: string) {
    return of({
      id,
      number: 'A1',
      isAvailable: true,
      floor: 2
    } as unknown as ParkingSpot);
  }
}

class MockRateService {
  getRateById(id: string) {
    return of({
      id,
      price: 0.035,
      currency: 'USD'
    } as unknown as Rate);
  }
}

// Mock RegistryService
class MockRegistryService {
  getRegistries() {
    return of([ // Directly return an array of registries
      {
        id: '1',
        idParkingSpot: 'A1',
        idVehicle: '1',
        idRate: '1',
        entryTime: new Date(),
        exitTime: new Date(), // exitTime puede ser null o un Date
      } as Registry,
      {
        id: '2',
        idParkingSpot: 'B2',
        idVehicle: '2',
        idRate: '2',
        entryTime: new Date(),
        exitTime: new Date(), // exitTime puede ser null o un Date
      } as Registry
    ] as Registry[]); // Return an observable with the array
  }
}

describe('VehicleDetailComponent', () => {
  let component: VehicleDetailComponent;
  let fixture: ComponentFixture<VehicleDetailComponent>;
  let vehicleService: MockVehicleService;
  let parkingSpotService: MockParkingSpotService;
  let rateService: MockRateService;
  let registryService: MockRegistryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule, CardDetailComponent, RouterModule, VehicleDetailComponent, BrowserAnimationsModule], // Import the standalone component here
      providers: [
        { provide: VehicleService, useClass: MockVehicleService },
        { provide: ParkingSpotService, useClass: MockParkingSpotService },
        { provide: RateService, useClass: MockRateService },
        { provide: RegistryService, useClass: MockRegistryService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '1' } },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleDetailComponent);
    component = fixture.componentInstance;
    vehicleService = TestBed.inject(VehicleService);
    parkingSpotService = TestBed.inject(ParkingSpotService);
    rateService = TestBed.inject(RateService);
    registryService = TestBed.inject(RegistryService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load vehicle details', () => {
    spyOn(vehicleService, 'getVehicleById').and.callThrough();
    component.ngOnInit();
    expect(vehicleService.getVehicleById).toHaveBeenCalledWith('1');
    expect(component.vehicle).toBeDefined();
    expect(component.vehicle.licensePlate).toBe('ABC123');
  });

  it('should load registries and spot details', () => {
    // Ensure the mock method is called
    spyOn(registryService, 'getRegistries').and.callThrough();
    spyOn(parkingSpotService, 'getParkingSpotById').and.callThrough();
    spyOn(rateService, 'getRateById').and.callThrough();
  
    // Trigger ngOnInit() to call getVehicleById and then loadRegistries
    component.ngOnInit();
  
    // Use `fixture.detectChanges()` to trigger Angular change detection and wait for async calls to finish
    fixture.detectChanges();
  
    // Check that the registryService.getRegistries method is called
    expect(registryService.getRegistries).toHaveBeenCalled();
    
    // Check that parkingSpotService and rateService are called for the registry details
    expect(parkingSpotService.getParkingSpotById).toHaveBeenCalledWith('A1');
    expect(rateService.getRateById).toHaveBeenCalledWith('1');
  
    // Ensure that the parking spots and rates are defined after loading
    expect(component.parkingSpots['A1']).toBeDefined();
    expect(component.rates['1']).toBeDefined();
  });
  


  it('should load active registry and associated data', fakeAsync(() => {
    const activeRegistry = { 
      id: '1', 
      idVehicle: '1', 
      idParkingSpot: 'A1', 
      idRate: '1', 
      entryTime: new Date(), 
      exitTime: new Date("NaT"), // Null exit time means active
    };
  
    spyOn(parkingSpotService, 'getParkingSpotById').and.returnValue(of({ id: 'A1', spotNumber: 1, isOccupied: true, idFloor: "1" } as unknown as ParkingSpot));
    spyOn(rateService, 'getRateById').and.returnValue(of({ id: '1', pricePerMinute: 0.035 } as unknown as Rate));
  
    // Call loadRegistries to simulate data loading
    component.loadRegistries([activeRegistry]);
  
    // Simulate the async passage of time
    tick();
    fixture.detectChanges();  // Ensure all async changes are reflected in the view
  
    // Check that the properties are set correctly
    expect(component.registryActive?.id).toBe('1');
    expect(component.parkingSpotActive?.spotNumber).toBe(1);
    expect(component.rateActive?.pricePerMinute).toBe(0.035);
  }));
  
  

  it('should handle case where no active registry is found', () => {
    spyOn(console, 'log');
    component.loadRegistries([{
      id: '1',
      idVehicle: '1',
      idParkingSpot: 'A1',
      idRate: '1',
      entryTime: new Date(),
      exitTime: new Date(),
    }]);
    expect(console.log).toHaveBeenCalledWith('No se encontró un registro activo.');
  });

  it('should update the vehicle when onVehicleUpdated is called', () => {
    const updatedVehicle = { 
      id: '1', 
      licensePlate: 'XYZ789', 
      model: 'Model Y', 
      vehicleType: 'Sedan', 
      color: 'Blue', 
      active: false 
    };
    component.onVehicleUpdated(updatedVehicle);
    expect(component.vehicle).toEqual(updatedVehicle);
  });
});
