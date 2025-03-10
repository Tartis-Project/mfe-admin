import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RatesFormComponent } from './rates-form.component';
import { RateService } from '../../services/rates.service';
import { Rate } from '../../interfaces/rates.model';
import { of, throwError } from 'rxjs';
import { MaterialModule } from '../../../../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 


describe('RatesFormComponent', () => {
  let component: RatesFormComponent;
  let fixture: ComponentFixture<RatesFormComponent>;
  let rateService: jasmine.SpyObj<RateService>;
  let dialogRef: MatDialogRef<RatesFormComponent>;

  const mockRate: Rate = {
    id: '1',
    description: 'Estándar',
    pricePerMinute: 0.035,
  };

  beforeEach(() => {
    const rateServiceSpy = jasmine.createSpyObj('RateService', [
      'createRate',
      'updateRate',
    ]);

    TestBed.configureTestingModule({
      declarations: [],
      imports: [RatesFormComponent, ReactiveFormsModule, MaterialModule, BrowserAnimationsModule],
      providers: [
        FormBuilder,
        {
          provide: MatDialogRef,
          useValue: { close: jasmine.createSpy('close') },
        },
        { provide: RateService, useValue: rateServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RatesFormComponent);
    component = fixture.componentInstance;
    rateService = TestBed.inject(RateService) as jasmine.SpyObj<RateService>;
    dialogRef = TestBed.inject(MatDialogRef);

    // Inicializar el componente con los datos mock si se proporciona una tarifa.
    component.rate = mockRate;

    fixture.detectChanges();
  });

  it('should initialize the form with rate data', () => {
    component.ngOnInit(); // Asegúrate de llamar a ngOnInit antes de la verificación.
  
    expect(component.ratesForm.value.description).toBe(mockRate.description);
    expect(component.ratesForm.value.pricePerMinute).toBe(mockRate.pricePerMinute);
  });
  
  
  

  it('should fill the form with rate data when the rate is provided', () => {
    const mockRate: any = {
      description: 'Estándar',
      pricePerMinute: 0.035,
    };
  
    component.rate = mockRate; // Se pasa un rate sin 'id' aquí
    component.ngOnInit();
    expect(component.ratesForm.value).toEqual(mockRate);
  });
  

  it('should create a new rate', () => {
    const rateData: any = {
      description: 'Nuevo',
      pricePerMinute: 0.045,
    };
  
    rateService.createRate.and.returnValue(of({ ...rateData, id: '1' })); // Simulamos la respuesta del servidor con un 'id'
  
    component.ratesForm.setValue(rateData);
    component.addRate();
  
    expect(rateService.createRate).toHaveBeenCalledWith(rateData);
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });
  

  it('should handle error when creating a new rate', () => {
    const rateData: any = {
      description: 'Nuevo', pricePerMinute: 0.045,
    };

    rateService.createRate.and.returnValue(throwError(() => new Error('Error al crear la tarifa')));

    component.ratesForm.setValue(rateData);
    component.addRate();

    expect(rateService.createRate).toHaveBeenCalledWith(rateData);
    expect(dialogRef.close).not.toHaveBeenCalled();
  });

  it('should update an existing rate', () => {
    const updatedRate: any = {
      description: 'Actualizado', pricePerMinute: 0.04,
    };
  
    rateService.updateRate.and.returnValue(of(updatedRate));
  
    component.ratesForm.setValue(updatedRate);
    component.updateRate();
  
    expect(rateService.updateRate).toHaveBeenCalledWith(mockRate.id, updatedRate);
    expect(dialogRef.close).toHaveBeenCalled();
  });
  

  it('should close the dialog on onNoClick()', () => {
    component.onNoClick();
    expect(dialogRef.close).toHaveBeenCalled();
  });
});
