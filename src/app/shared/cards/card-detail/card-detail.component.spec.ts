import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardDetailComponent } from './card-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VehicleService } from '../../../pages/vehicles/services/vehicle.service';
import { of } from 'rxjs';
import {
  MatDialog,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CardFormComponent } from '../card-form/card-form.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatDialogHarness } from '@angular/material/dialog/testing';

describe('CardDetailComponent', () => {
  let component: CardDetailComponent;
  let fixture: ComponentFixture<CardDetailComponent>;
  let vehicleServiceMock: jasmine.SpyObj<VehicleService>;
  let loader: HarnessLoader;
  let dialog: MatDialog;
  let router: Router;

  const mockVehicle = {
    id: '1',
    licensePlate: 'ABC123',
    model: 'Toyota Corolla',
    vehicleType: 'Coche',
    color: 'Red',
    active: true,
  };

  const mockRouter = {
    url: '/vehicle-detail',
  };

  beforeEach(async () => {
    // Crear el espía para VehicleService
    vehicleServiceMock = jasmine.createSpyObj('VehicleService', [
      'getVehicleById',
    ]);

    // Configuración del TestBed
    await TestBed.configureTestingModule({
      imports: [
        CardDetailComponent,
        CardFormComponent,
        MatDialogModule,
        HttpClientTestingModule,
      ], // Importa los módulos necesarios
      declarations: [], // Declara los componentes
      providers: [
        { provide: VehicleService, useValue: vehicleServiceMock },
        { provide: Router, useValue: mockRouter },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { dialogData: mockVehicle }, // Proveer los datos directamente
        },
      ],
    }).compileComponents();

    // Simular la respuesta del servicio
    vehicleServiceMock.getVehicleById.and.returnValue(of(mockVehicle));

    // Crear la instancia del componente
    fixture = TestBed.createComponent(CardDetailComponent);
    component = fixture.componentInstance;

    // Inyectar dependencias
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);

    dialog = TestBed.inject(MatDialog);
    router = TestBed.inject(Router);

    // Detectar cambios para inicializar correctamente el componente
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog with the correct data when openDialog() is called', async () => {
    component.vehicle = mockVehicle;

    component.openDialog();

    const dialogHarness = await loader.getHarness(MatDialogHarness);

    expect(dialogHarness).toBeTruthy();
  });
});
