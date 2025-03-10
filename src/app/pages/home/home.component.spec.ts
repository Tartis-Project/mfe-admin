import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../../material/material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule, Router } from '@angular/router';
import { ParkingService } from '../parking/services/parking.service';
import { ParkingSpotService } from '../parking/services/parkingSpot.service';
import { RegistryService } from '../../shared/registry/services/registry.service';
import { VehicleService } from '../vehicles/services/vehicle.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin/services/administrator.service';
import { KeycloakService } from 'keycloak-angular';

// Mocks para los servicios
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let routerMock: jasmine.SpyObj<Router>;
  let parkingServiceMock: jasmine.SpyObj<ParkingService>;
  let parkingSpotServiceMock: jasmine.SpyObj<ParkingSpotService>;
  let registryServiceMock: jasmine.SpyObj<RegistryService>;
  let vehicleServiceMock: jasmine.SpyObj<VehicleService>;
  let adminServiceMock: jasmine.SpyObj<AdminService>;

  const mockKeycloakService = {
    isLoggedIn: jasmine.createSpy('isLoggedIn').and.returnValue(Promise.resolve(true)),
    loadUserProfile: jasmine.createSpy('loadUserProfile').and.returnValue(Promise.resolve({ name: 'Test User' })),
    login: jasmine.createSpy('login'),
    logout: jasmine.createSpy('logout'),
  };
  

  beforeEach(async () => {
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    parkingServiceMock = jasmine.createSpyObj('ParkingService', ['getFloors']);
    parkingSpotServiceMock = jasmine.createSpyObj('ParkingSpotService', ['getParkingSpots']);
    registryServiceMock = jasmine.createSpyObj('RegistryService', ['getRegistries']);
    vehicleServiceMock = jasmine.createSpyObj('VehicleService', ['getVehicles']);
    adminServiceMock = jasmine.createSpyObj('AdminService', ['getAdminData', 'getUserFirstName']);


    await TestBed.configureTestingModule({
      imports: [MaterialModule, RouterModule, HttpClientTestingModule], // Incluir HttpClientTestingModule para evitar llamadas HTTP reales
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: ParkingService, useValue: parkingServiceMock },
        { provide: ParkingSpotService, useValue: parkingSpotServiceMock },
        { provide: RegistryService, useValue: registryServiceMock },
        { provide: VehicleService, useValue: vehicleServiceMock },
        { provide: KeycloakService, useValue: mockKeycloakService },
        { provide: AdminService, useValue: adminServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => null } },
            paramMap: of({ get: () => null }),
          },
        },
      ],
    }).compileComponents();

    // Mock de los servicios
    vehicleServiceMock.getVehicles.and.returnValue(of([
      { id: '1', licensePlate: 'ABC123', model: 'Toyota Corolla', vehicleType: 'Coche', color: 'Red', active: true },
      { id: '2', licensePlate: 'XYZ456', model: 'Honda Civic', vehicleType: 'Coche', color: 'Blue', active: false },
    ]));

    parkingServiceMock.getFloors.and.returnValue(of([
      {
        id: "8617",
        floorNumber: 1,
        numberOfSpots: 120,
        operative: true
      },
      {
        id: "0f67",
        floorNumber: 2,
        numberOfSpots: 100,
        operative: false
      },
    ]));

    parkingSpotServiceMock.getParkingSpots.and.returnValue(of([
      {
        id: "79b7",
        idFloor: "8617",
        spotNumber: 1,
        occupied: true
      },
      {
        id: "ea2f",
        idFloor: "0f67",
        spotNumber: 2,
        occupied: false
      },
    ]));

    registryServiceMock.getRegistries.and.returnValue(of([
      {
        id: "5e9a8939-cad9-4b4c-bf3b-c17ea71fb869",
        idParkingSpot: "263",
        idVehicle: "1",
        idRate: "35cd",
        entryTime: new Date("2025-02-24T15:39:27.612Z"),  // Convertir a Date
        exitTime: new Date("NaT"),  // Mantener null para indicar que aún no ha salido
        amount: 0
      },
      {
        id: "5101a7b1-ddfb-4887-af73-ad0360ea24b8",
        idParkingSpot: "294",
        idVehicle: "2",
        idRate: "35cd",
        entryTime: new Date("2025-02-26T10:29:27.612Z"),  // Convertir a Date
        exitTime: new Date("2025-02-26T11:12:27.612Z"),  // Convertir a Date
        amount: 1.51
      },
    ]));
    

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should map vehicles correctly', () => {
    fixture.detectChanges();
    expect(component.vehiclesMap).toEqual({
      '1': { id: '1', licensePlate: 'ABC123', model: 'Toyota Corolla', vehicleType: 'Coche', color: 'Red', active: true },
      '2': { id: '2', licensePlate: 'XYZ456', model: 'Honda Civic', vehicleType: 'Coche', color: 'Blue', active: false },
    });
  });

  it('should calculate occupied spots correctly', () => {
    fixture.detectChanges();
    component.floorsWithOccupiedSpots$.subscribe(floors => {
      expect(floors.length).toBe(2);
      expect(floors[0].occupiedSpots).toBe(1); 
      expect(floors[1].occupiedSpots).toBe(0); 
    });
  });

  it('should return the latest movements correctly', () => {
    fixture.detectChanges();
    component.latestMovements$.subscribe(movements => {
      expect(movements.length).toBe(2);
      expect(movements[0].id).toBe('5101a7b1-ddfb-4887-af73-ad0360ea24b8'); 
      expect(movements[1].id).toBe('5e9a8939-cad9-4b4c-bf3b-c17ea71fb869'); 
    });
  });

  it('should navigate to vehicle detail on goDetail', () => {
    component.goDetail('1');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/vehicles', '1']);
  });

  it('should unsubscribe pollingSubscription on destroy', () => {
    component['pollingSubscription'] = jasmine.createSpyObj('Subscription', ['unsubscribe']);

    component.ngOnDestroy();

    expect(component['pollingSubscription'].unsubscribe).toHaveBeenCalled();
  });

});
