import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Rate } from '../interfaces/rates.model';
import { environment } from '../../../../environments/environment';
import { RateService } from './rates.service';

describe('RateService', () => {
  let service: RateService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl + '/rates';

  const mockRates = [
    {
      id: "1",
      name: "Estándar",
      pricePerMinute: 0.035
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RateService],
    });
    service = TestBed.inject(RateService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getRates', () => {
    it('should fetch all rates', () => {
      service.getRates().subscribe((rates: Rate[]) => {
        expect(rates.length).toBe(1);  // Cambia de 2 a 1, ya que solo tienes un elemento en mockRates
        expect(rates).toEqual(mockRates);
      });
    
      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockRates);
    });
    

    it('should handle error when fetching rates', () => {
      const errorMessage = 'Error al cargar las tarifas';
    
      service.getRates().subscribe(
        () => fail('should have failed with an error'),
        (error) => {
          expect(error).toBeTruthy();
        }
      );
    
      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
    });
  }); // <-- Aquí cerré el bloque describe de getRates
  
  describe('getRateById', () => {
    it('should fetch a single rate by id', () => {
      const rateId = '1';

      service.getRateById(rateId).subscribe((rate: Rate) => {
        expect(rate).toEqual(mockRates[0]);
      });

      const req = httpMock.expectOne(`${apiUrl}/${rateId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockRates[0]);
    });
  });

  describe('createRate', () => {
    it('should create a new rate', () => {

      service.createRate(mockRates[0]).subscribe((rate: Rate) => {
        expect(rate).toEqual(mockRates[0]);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockRates[0]);
      req.flush(mockRates[0]);
    });
  });

  describe('updateRate', () => {
    it('should update an existing rate', () => {
      const rateId = '1';

      service.updateRate(rateId, mockRates[0]).subscribe((rate: Rate) => {
        expect(rate).toEqual(mockRates[0]);
      });

      const req = httpMock.expectOne(`${apiUrl}/${rateId}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(mockRates[0]);
      req.flush(mockRates[0]);
    });
  });

  describe('deleteRate', () => {
    describe('deleteRate', () => {
      it('should delete a rate', () => {
        const rateId = '1';
    
        service.deleteRate(rateId).subscribe((response: any) => {
          expect(response).toBeNull();  // Verifica que la respuesta sea null
        });
    
        const req = httpMock.expectOne(`${apiUrl}/${rateId}`);
        expect(req.request.method).toBe('DELETE');
        req.flush(null);  // Devuelve null como respuesta
      });
    });
    
  });
});
