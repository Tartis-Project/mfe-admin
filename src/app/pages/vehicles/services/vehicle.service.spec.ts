import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VehicleService } from './vehicle.service';
import { Vehicle } from '../interfaces/vehicle.model';
import { environment } from '../../../../environments/environment';

describe('VehicleService', () => {
  let service: VehicleService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl + '/vehicles';

  const mockVehicles: Vehicle[] = [
    { id: '15', licensePlate: 'NOP012', model: 'Porsche 911', vehicleType: 'Coche', color: 'Red', active: true },
    { id: '16', licensePlate: 'QRS345', model: 'Lexus RX', vehicleType: 'Coche', color: 'Black', active: true },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VehicleService],
    });

    service = TestBed.inject(VehicleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all vehicles', () => {
    service.getVehicles().subscribe((vehicles) => {
      expect(vehicles.length).toBe(2);
      expect(vehicles).toEqual(mockVehicles);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockVehicles);
  });

  it('should retrieve a vehicle by ID', () => {
    const vehicleId = '15';
    service.getVehicleById(vehicleId).subscribe((vehicle) => {
      expect(vehicle).toEqual(mockVehicles[0]);
    });

    const req = httpMock.expectOne(`${apiUrl}/${vehicleId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockVehicles[0]);
  });

  it('should add a new vehicle', () => {
    const newVehicle: Vehicle = { id: '17', licensePlate: 'TUV678', model: 'Tesla Model S', vehicleType: 'Coche', color: 'White', active: true };

    service.addVehicle(newVehicle).subscribe((vehicle) => {
      expect(vehicle).toEqual(newVehicle);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newVehicle);
    req.flush(newVehicle);
  });

  it('should update an existing vehicle', () => {
    const updatedVehicle: Partial<Vehicle> = { color: 'Blue' };
    const vehicleId = '16';

    service.updateVehicle(vehicleId, updatedVehicle).subscribe((vehicle) => {
      expect(vehicle.color).toBe('Blue');
    });

    const req = httpMock.expectOne(`${apiUrl}/${vehicleId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedVehicle);
    req.flush({ ...mockVehicles[1], ...updatedVehicle });
  });

  it('should delete a vehicle', () => {
    const vehicleId = '15';

    service.deleteVehicle(vehicleId).subscribe((res) => {
      expect(res).toBeNull();
    });

    const req = httpMock.expectOne(`${apiUrl}/${vehicleId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
