import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ParkingFormComponent } from './parking-form.component';
import { MaterialModule } from '../../../../material/material.module';
import { ParkingService } from '../../services/parking.service';
import { ParkingSpotService } from '../../services/parkingSpot.service';
import { of } from 'rxjs';
import { Floor } from '../../interfaces/floor.model';
import { ParkingSpot } from '../../interfaces/parkingSpot.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ParkingFormComponent', () => {
  let component: ParkingFormComponent;
  let fixture: ComponentFixture<ParkingFormComponent>;
  let parkingServiceMock: jasmine.SpyObj<ParkingService>;
  let parkingSpotServiceMock: jasmine.SpyObj<ParkingSpotService>;
  let dialogRefMock: jasmine.SpyObj<MatDialogRef<ParkingFormComponent>>;
  let fb: FormBuilder;

  const mockFloor: Floor = {
    id: '1',
    floorNumber: 1,
    numberOfSpots: 10,
    operative: true,
  };

  const mockParkingSpots: ParkingSpot[] = [
    { id: '1', idFloor: '1', spotNumber: 1, occupied: false },
    { id: '2', idFloor: '1', spotNumber: 2, occupied: true },
  ];

  beforeEach(() => {
    parkingServiceMock = jasmine.createSpyObj('ParkingService', [
      'addFloor',
      'updateFloor',
    ]);
    parkingSpotServiceMock = jasmine.createSpyObj('ParkingSpotService', [
      'getLastSpotNumber',
      'addParkingSpot',
    ]);
    dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);
    fb = new FormBuilder();

    TestBed.configureTestingModule({
      imports: [
        ParkingFormComponent,
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
      ],
      declarations: [],
      providers: [
        { provide: ParkingService, useValue: parkingServiceMock },
        { provide: ParkingSpotService, useValue: parkingSpotServiceMock },
        { provide: MatDialogRef, useValue: dialogRefMock },
      ],
    });

    fixture = TestBed.createComponent(ParkingFormComponent);
    component = fixture.componentInstance;
    component.floor = mockFloor; // Se simula que el componente recibe un floor
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with floor data', () => {
    expect(component.parkingForm.value.floorNumber).toBe(mockFloor.floorNumber);
    expect(component.parkingForm.value.numberOfSpots).toBe(
      mockFloor.numberOfSpots,
    );
    expect(component.parkingForm.value.operative).toBe(mockFloor.operative);
  });

  // it('should call addFloor and add parking spots when form is valid', () => {
  //   const newFloor = { ...mockFloor, numberOfSpots: 5 };
  //   const lastSpotNumber = 3; // Simula el último número de plaza

  //   parkingSpotServiceMock.getLastSpotNumber.and.returnValue(of(lastSpotNumber));
  //   parkingServiceMock.addFloor.and.returnValue(of({ ...newFloor, id: '2' })); // Simulamos el id generado por el servidor
  //   parkingSpotServiceMock.addParkingSpot.and.returnValue(of({
  //     id: '',
  //     idFloor: '1',
  //     spotNumber: 1,
  //     occupied: false
  //   }));

  //   // Asegúrate de que el número de plantas esté correctamente configurado en el formulario
  //   component.parkingForm.setValue({
  //     number: mockFloor.floorNumber,  // Usa el mismo número de planta que el mockFloor
  //     numberOfSpots: 5,
  //     isOperative: true,
  //   });

  //   component.addFloor();

  //   // Verifica que se haya llamado a addParkingSpot el número adecuado de veces
  //   expect(parkingSpotServiceMock.addParkingSpot).toHaveBeenCalledTimes(5); // Debe agregar 5 spots
  //   expect(dialogRefMock.close).toHaveBeenCalled();
  // });

  it('should update floor when form is valid', () => {
    const updatedFloor = { ...mockFloor, id: '1' };

    component.parkingForm.setValue({
      id: '1',
      floorNumber: 1,
      numberOfSpots: mockFloor.numberOfSpots,
      operative: true,
    });

    parkingServiceMock.updateFloor.and.returnValue(of(updatedFloor));

    component.updateFloor();

    // Verificamos que el servicio updateFloor haya sido llamado con los valores correctos
    expect(parkingServiceMock.updateFloor).toHaveBeenCalledWith(
      '1',
      updatedFloor,
    );
    expect(dialogRefMock.close).toHaveBeenCalled();
  });

  it('should call onNoClick and close the dialog', () => {
    component.onNoClick();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });

  // it('should not add floor if form is invalid', () => {
  //   component.parkingForm.setValue({
  //     number: '',
  //     numberOfSpots: 0,
  //     isOperative: false,
  //   });

  //   component.addFloor();

  //   expect(parkingServiceMock.addFloor).not.toHaveBeenCalled();
  // });
});
