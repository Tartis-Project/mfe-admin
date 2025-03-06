import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardDetailComponent } from './card-detail.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { MockProvider } from 'ng-mocks';
import { VehicleService } from '../../../pages/vehicles/services/vehicle.service';
import { CardFormComponent } from '../card-form/card-form.component';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { MaterialModule } from '../../../material/material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatDialogHarness } from '@angular/material/dialog/testing';

describe('CardDetailComponent', () => {
  let component: CardDetailComponent;
  let fixture: ComponentFixture<CardDetailComponent>;
  let loader: HarnessLoader;
  let dialog: jasmine.SpyObj<MatDialog>;
  let vehicleService: jasmine.SpyObj<VehicleService>;

  beforeEach(async () => {
    // Mock MatDialog and VehicleService
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    const vehicleServiceSpy = jasmine.createSpyObj('VehicleService', ['getVehicleById']);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CardDetailComponent, CardFormComponent, ConfirmDialogComponent, MaterialModule, HttpClientTestingModule],
      providers: [
        { provide: MatDialog, useValue: dialogSpy },
        { provide: VehicleService, useValue: vehicleServiceSpy },
        MockProvider(MAT_DIALOG_DATA, {}),
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDetailComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    vehicleService = TestBed.inject(VehicleService) as jasmine.SpyObj<VehicleService>;

    // Initialize the loader after fixture is fully initialized
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);

    fixture.detectChanges(); // Trigger change detection
  });

  it('should open dialog and call getVehicleById on afterClosed', async () => {
    
  });
});
