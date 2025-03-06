import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ParkingService } from './parking.service';
import { ParkingSpotService } from './parkingSpot.service';
import { Floor } from '../interfaces/floor.model';
import { environment } from '../../../../environments/environment';
import { of } from 'rxjs';
import { ParkingSpot } from '../interfaces/parkingSpot.model';

describe('ParkingService', () => {
  let service: ParkingService;
  let httpMock: HttpTestingController;
  let parkingSpotServiceMock: jasmine.SpyObj<ParkingSpotService>;
  const apiUrl = environment.apiUrl + '/floors';

  const mockFloors: Floor[] = [
    { id: '1', number: 1, numberOfSpots: 10, isOperative: true },
    { id: '2', number: 2, numberOfSpots: 20, isOperative: false },
  ];

  const mockSpots: ParkingSpot[] = [
    {
      id: "79b7",
      idFloor: "1",
      spotNumber: 1,
      isOccupied: false
    },
    {
      id: "ea2f",
      idFloor: "2",
      spotNumber: 2,
      isOccupied: false
    },
  ];

  beforeEach(() => {
    parkingSpotServiceMock = jasmine.createSpyObj('ParkingSpotService', ['getParkingSpots', 'deleteParkingSpot']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ParkingService,
        { provide: ParkingSpotService, useValue: parkingSpotServiceMock },
      ],
    });

    service = TestBed.inject(ParkingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all floors', () => {
    service.getFloors().subscribe(floors => {
      expect(floors.length).toBe(2);
      expect(floors).toEqual(mockFloors);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockFloors);
  });

  it('should retrieve a floor by ID', () => {
    service.getFloorById('1').subscribe(floor => {
      expect(floor).toEqual(mockFloors[0]);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockFloors[0]);
  });

  it('should add a new floor', () => {
    const newFloor: Floor = { id: '3', number: 3, numberOfSpots: 15, isOperative: true };

    service.addFloor(newFloor).subscribe(floor => {
      expect(floor).toEqual(newFloor);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(newFloor);
  });

  it('should update a floor', () => {
    const updatedFloor: Partial<Floor> = { numberOfSpots: 25 };

    service.updateFloor('1', updatedFloor).subscribe(floor => {
      expect(floor.numberOfSpots).toBe(25);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush({ ...mockFloors[0], ...updatedFloor });
  });

  
  it('should delete a floor with no parking spots', () => {
    parkingSpotServiceMock.getParkingSpots.and.returnValue(of([]));
  
    service.deleteFloor('2').subscribe(response => {
      expect(response).toBeNull();  
      expect(parkingSpotServiceMock.deleteParkingSpot).not.toHaveBeenCalled();
    });
  
    const req = httpMock.expectOne(`${apiUrl}/2`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); 
  });

  it('should delete a floor with parking spots', () => {
    parkingSpotServiceMock.getParkingSpots.and.returnValue(of([
      { id: '79b7', idFloor: '1', spotNumber: 1, isOccupied: false },
      { id: 'ea2f', idFloor: '1', spotNumber: 2, isOccupied: false }
    ]));
  
    parkingSpotServiceMock.deleteParkingSpot.and.returnValue(of());
  
    service.deleteFloor('1').subscribe(response => {
      expect(response).toBeUndefined();
      expect(parkingSpotServiceMock.deleteParkingSpot).toHaveBeenCalledTimes(2);
    });
  
  });
  
  
  
  
  
  

  
});
