import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ParkingSpotService } from './parkingSpot.service';
import { environment } from '../../../../environments/environment';
import { ParkingSpot } from '../interfaces/parkingSpot.model';
import { of } from 'rxjs';

describe('ParkingSpotService', () => {
  let service: ParkingSpotService;
  let httpMock: HttpTestingController;

  const apiUrl = environment.apiUrl + '/spots';

  const mockSpots: ParkingSpot[] = [
    { id: '1', idFloor: '1', spotNumber: 1, occupied: false },
    { id: '2', idFloor: '1', spotNumber: 2, occupied: true },
    { id: '3', idFloor: '2', spotNumber: 1, occupied: false },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ParkingSpotService],
    });

    service = TestBed.inject(ParkingSpotService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all parking spots', () => {
    service.getParkingSpots().subscribe((spots) => {
      expect(spots.length).toBe(3);
      expect(spots).toEqual(mockSpots);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockSpots);
  });

  it('should retrieve a parking spot by ID', () => {
    const spotId = '1';
    service.getParkingSpotById(spotId).subscribe((spot) => {
      expect(spot).toEqual(mockSpots[0]);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSpots[0]);
  });

  it('should add a new parking spot', () => {
    const newSpot: ParkingSpot = { id: '4', idFloor: '1', spotNumber: 3, occupied: false };

    service.addParkingSpot(newSpot).subscribe((spot) => {
      expect(spot).toEqual(newSpot);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(newSpot);
  });

  it('should update a parking spot', () => {
    const updatedSpot: Partial<ParkingSpot> = { occupied: true };

    service.updateParkingSpot('1', updatedSpot).subscribe((spot) => {
      expect(spot.occupied).toBeTrue();
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush({ ...mockSpots[0], ...updatedSpot });
  });

  it('should delete a parking spot', () => {
    service.deleteParkingSpot('2').subscribe(response => {
      expect(response).toBeNull();  
    });
  
    const req = httpMock.expectOne(`${apiUrl}/2`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); 
  });

  it('should retrieve the last spot number', () => {
    service.getLastSpotNumber().subscribe((lastSpotNumber) => {
      expect(lastSpotNumber).toBe(2); 
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockSpots);
  });
});
