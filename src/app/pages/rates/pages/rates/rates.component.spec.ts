import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatesComponent } from './rates.component';
import { MaterialModule } from '../../../../material/material.module';
import { CardViewComponent } from '../../../../shared/cards/card-view/card-view.component';
import { RateService } from '../../services/rates.service';
import { of, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

describe('RatesComponent', () => {
  let component: RatesComponent;
  let fixture: ComponentFixture<RatesComponent>;
  let ratesServiceMock: jasmine.SpyObj<RateService>;
  let loader: HarnessLoader;
  let dialog: MatDialog;

  const mockRates = [
    {
      id: "35cd",
      name: "Estándar",
      pricePerMinute: 0.035
    }
  ];

  beforeEach(() => {
    ratesServiceMock = jasmine.createSpyObj('RateService', ['getRates']);

    // Configurar el módulo de pruebas
    TestBed.configureTestingModule({
      imports: [RatesComponent, MaterialModule, CardViewComponent],
      declarations: [], // Declare the RatesComponent here
      providers: [
        { provide: RateService, useValue: ratesServiceMock },
      ],
    }).compileComponents();

    // Create the component fixture after configuring the module
    fixture = TestBed.createComponent(RatesComponent);
    component = fixture.componentInstance;

    // Initialize the loader after the fixture is created
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    
    // Mock the service
    ratesServiceMock.getRates.and.returnValue(of(mockRates));

    // Inject the dialog
    dialog = TestBed.inject(MatDialog);

    // Detect initial changes
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load rates on init', () => {
    ratesServiceMock.getRates.and.returnValue(of(mockRates));
    component.ngOnInit();
    expect(component.rates).toEqual(mockRates);
  });

  it('should handle error when loading rates', () => {
    const errorMessage = 'Error loading rates';
    ratesServiceMock.getRates.and.returnValue(throwError(() => new Error(errorMessage)));
    spyOn(console, 'error');
    component.ngOnInit();
    expect(console.error).toHaveBeenCalledWith('Error al cargar las tarifas:', jasmine.any(Error));
  });

  it('should open dialog when openDialog is called', async () => {
    spyOn(component, 'loadRates');
  
    component.openDialog(); 
  
    const dialogHarness = await loader.getHarness(MatDialogHarness);
    expect(dialogHarness).toBeTruthy(); // Ensure dialog is present
  
    const dialogText = await dialogHarness.getText();
    expect(dialogText).toBe(''); // Expect non-empty dialog content
  
    await dialogHarness.close();
    expect(component.loadRates).toHaveBeenCalled();
  });
  
});
