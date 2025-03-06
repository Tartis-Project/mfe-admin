import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardViewComponent } from './card-view.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { MaterialModule } from '../../../material/material.module';
import { CardFormComponent } from '../card-form/card-form.component';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { EuroCurrencyPipe } from "../../../core/pipes/euro-currency.pipe";
import { Rate } from '../../../pages/rates/interfaces/rates.model';
import { Vehicle } from '../../../pages/vehicles/interfaces/vehicle.model';
import { Floor } from '../../../pages/parking/interfaces/floor.model';

describe('CardViewComponent', () => {
  let component: CardViewComponent;
  let fixture: ComponentFixture<CardViewComponent>;
  let dialog: jasmine.SpyObj<MatDialog>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    routerSpy.url = '/vehicles'; // Simulate the route

    await TestBed.configureTestingModule({
      declarations: [  ],
      imports: [CardViewComponent, CardFormComponent, ConfirmDialogComponent, EuroCurrencyPipe, MaterialModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: MatDialog, useValue: dialogSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardViewComponent);
    component = fixture.componentInstance;

    // Provide a mock vehicle to the component
    const mockVehicle: Vehicle = {
      id: '1',
      licensePlate: 'ABC123',
      model: 'Toyota Corolla',
      type: 'Car',
      color: 'Red',
      isActive: true,
    };
    component.vehicle = mockVehicle;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
