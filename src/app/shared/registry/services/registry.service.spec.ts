import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegistryService } from './registry.service';
import { VehicleService } from '../../../pages/vehicles/services/vehicle.service';
import { environment } from '../../../../environments/environment';
import { Registry } from '../interfaces/registry.model';
import { of } from 'rxjs';

describe('RegistryService', () => {
  let service: RegistryService;
  let httpMock: HttpTestingController;
  let vehicleService: jasmine.SpyObj<VehicleService>;
  const apiUrl = environment.apiUrl + '/registries';

  beforeEach(() => {
    const vehicleServiceSpy = jasmine.createSpyObj('VehicleService', ['getVehicles']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RegistryService,
        { provide: VehicleService, useValue: vehicleServiceSpy },
      ],
    });

    service = TestBed.inject(RegistryService);
    httpMock = TestBed.inject(HttpTestingController);
    vehicleService = TestBed.inject(VehicleService) as jasmine.SpyObj<VehicleService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve registries and filter them based on vehicles', () => {
    const mockRegistries: Registry[] = [
      {
        id: '3716e4e5-1f0a-41df-8f83-48ed8cc51c8e',
        idParkingSpot: '59',
        idVehicle: '3',
        idRate: '35cd',
        entryTime: new Date('2025-03-02 08:39:27.612709'),
        exitTime: new Date(),
        amount: 0,
      },
      {
        id: '5e9a8939-cad9-4b4c-bf3b-c17ea71fb869',
        idParkingSpot: '263',
        idVehicle: '2',
        idRate: '35cd',
        entryTime: new Date('2025-02-24 15:39:27.612800'),
        exitTime: new Date(),
        amount: 0,
      },
    ];

    const mockVehicles = [
      { id: '3', licensePlate: 'ABC123', model: 'Toyota Corolla', type: 'Coche', color: 'Red', isActive: true },
      { id: '2', licensePlate: 'XYZ789', model: 'Honda Civic', type: 'Coche', color: 'Blue', isActive: false },
    ];

    vehicleService.getVehicles.and.returnValue(of(mockVehicles));

    service.getRegistries().subscribe((registries) => {
      expect(registries.length).toBe(2);
      expect(registries[0].idVehicle).toBe('3');
      expect(registries[1].idVehicle).toBe('2');
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockRegistries);
  });

  it('should retrieve a registry by ID', () => {
    const mockRegistry: Registry = {
      id: '3716e4e5-1f0a-41df-8f83-48ed8cc51c8e',
      idParkingSpot: '59',
      idVehicle: '3',
      idRate: '35cd',
      entryTime: new Date('2025-03-02 08:39:27.612709'),
      exitTime: new Date(),
      amount: 0,
    };

    service.getRegistryById(mockRegistry.id).subscribe((registry) => {
      expect(registry).toEqual(mockRegistry);
    });

    const req = httpMock.expectOne(`${apiUrl}/${mockRegistry.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRegistry);
  });

  it('should add a registry', () => {
    const newRegistry: Registry = {
      id: 'new-registry-id',
      idParkingSpot: '100',
      idVehicle: '5',
      idRate: '50cd',
      entryTime: new Date(),
      exitTime: new Date(),
      amount: 200,
    };

    service.addRegistry(newRegistry).subscribe((registry) => {
      expect(registry).toEqual(newRegistry);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(newRegistry);
  });

  it('should update a registry', () => {
    const updatedRegistry: Partial<Registry> = { amount: 500 };

    service.updateRegistry('3716e4e5-1f0a-41df-8f83-48ed8cc51c8e', updatedRegistry).subscribe((registry) => {
      expect(registry.amount).toBe(500);
    });

    const req = httpMock.expectOne(`${apiUrl}/3716e4e5-1f0a-41df-8f83-48ed8cc51c8e`);
    expect(req.request.method).toBe('PUT');
    req.flush({ ...updatedRegistry, id: '3716e4e5-1f0a-41df-8f83-48ed8cc51c8e' });
  });

  it('should delete a registry', () => {
    const registryId = '3716e4e5-1f0a-41df-8f83-48ed8cc51c8e';

    service.deleteRegistry(registryId).subscribe((res) => {
      expect(res).toBeNull(); // DELETE responses usually return empty body
    });

    const req = httpMock.expectOne(`${apiUrl}/${registryId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
