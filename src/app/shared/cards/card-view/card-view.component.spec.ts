import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardViewComponent } from './card-view.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { MaterialModule } from '../../../material/material.module';
import { CardFormComponent } from '../card-form/card-form.component';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { EuroCurrencyPipe } from '../../../core/pipes/euro-currency.pipe';
import { Rate } from '../../../pages/rates/interfaces/rates.model';
import { Vehicle } from '../../../pages/vehicles/interfaces/vehicle.model';
import { Floor } from '../../../pages/parking/interfaces/floor.model';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { computed } from '@angular/core';

describe('CardViewComponent', () => {
  let component: CardViewComponent;
  let fixture: ComponentFixture<CardViewComponent>;
  let loader: HarnessLoader;
  let dialog: MatDialog;
  let router: jasmine.SpyObj<Router>;

  const mockVehicle: Vehicle = {
    id: '1',
    licensePlate: 'ABC123',
    model: 'Toyota Corolla',
    type: 'Car',
    color: 'Red',
    isActive: true,
  };

  const mockRate: Rate = {
    id: 'rate-1',
    name: 'Standard Rate',
    pricePerMinute: 0
  };

  const mockFloor: Floor = {
    id: 'floor-1',
    number: 0,
    numberOfSpots: 0,
    isOperative: false
  };

  beforeEach(async () => {
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    routerSpy.url = '/vehicles'; 

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [MaterialModule, CardViewComponent, CardFormComponent, ConfirmDialogComponent, EuroCurrencyPipe, HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        {
                  provide: MAT_DIALOG_DATA, 
                  useValue: { dialogData: mockVehicle },  // Proveer los datos directamente
                },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardViewComponent);
    component = fixture.componentInstance;

    // Provide a mock vehicle to the component
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
        
        dialog = TestBed.inject(MatDialog);
    component.vehicle = mockVehicle;
    component.rate = mockRate;
    component.floor = mockFloor;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the dialog when openDialog() is called vehicles', async () => {
    component.openDialog();
    
    const dialogHarness = await loader.getHarness(MatDialogHarness);
    
    expect(dialogHarness).toBeTruthy();
  });

  it('should open the dialog when openDialog() is called plazas', async () => {
    component.isPlazas = computed(() => true)
    component.openDialog();
    
    const dialogHarness = await loader.getHarness(MatDialogHarness);
    
    expect(dialogHarness).toBeTruthy();
  });

  it('should open the dialog when openDialog() is called tarifas', async () => {
    component.isTarifas = computed(() => true)
    component.openDialog();
    
    const dialogHarness = await loader.getHarness(MatDialogHarness);
    
    expect(dialogHarness).toBeTruthy();
  });

  it('should open the dialog when openDialogDelete() is called vehicle', async () => {
    component.deleteAction();
    
    const dialogHarness = await loader.getHarness(MatDialogHarness);
    
    expect(dialogHarness).toBeTruthy();
  });

  it('should open the dialog when openDialogDelete() is called plazas', async () => {
    component.isPlazas = computed(() => true)
    component.deleteAction();
    
    const dialogHarness = await loader.getHarness(MatDialogHarness);
    
    expect(dialogHarness).toBeTruthy();
  });

  it('should open the dialog when openDialogDelete() is called tarifas', async () => {
    component.isTarifas = computed(() => true)
    component.deleteAction();
    
    const dialogHarness = await loader.getHarness(MatDialogHarness);
    
    expect(dialogHarness).toBeTruthy();
  });

  it('should navigate to vehicle list when navigateToList() is called', () => {
    component.viewVehicleDetail('1');
  });

});
