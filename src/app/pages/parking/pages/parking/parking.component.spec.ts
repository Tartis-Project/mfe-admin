import { CardFormComponent } from './../../../../shared/cards/card-form/card-form.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParkingComponent } from './parking.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ParkingService } from '../../services/parking.service';
import { Observable, of } from 'rxjs';
import { CardViewComponent } from '../../../../shared/cards/card-view/card-view.component';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {MatDialogHarness, MatTestDialogOpenerModule} from '@angular/material/dialog/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';

// class MdDialogMock {
//   open() {
//     return {
//       afterClosed: () => of(true),
//       componentInstance: {}
//     };
//   }
// };

describe('ParkingComponent', () => {
  let component: ParkingComponent;
  let fixture: ComponentFixture<ParkingComponent>;
  let parkingServiceMock: jasmine.SpyObj<ParkingService>;
  let loader: HarnessLoader;
  let dialog: MatDialog;
  let router: Router;

  const mockFloors = [
    {
      id: '8617',
      number: 1,
      numberOfSpots: 120,
      isOperative: true,
    },
    {
      id: '0f67',
      number: 2,
      numberOfSpots: 100,
      isOperative: false,
    },
  ];

  const mockRouter = {
    url: '/parking', 
  };

  beforeEach(async () => {
    parkingServiceMock = jasmine.createSpyObj('ParkingService', ['getFloors']);

    await TestBed.configureTestingModule({
      imports: [ParkingComponent, CardViewComponent, MatDialogModule, HttpClientTestingModule], 
      declarations: [], 
      providers: [
        { provide: ParkingService, useValue: parkingServiceMock },
        // {
        //   provide: MatDialog, useClass: MdDialogMock,
        // },
        { provide: Router, useValue: mockRouter } 
      ]
    }).compileComponents();

    parkingServiceMock.getFloors.and.returnValue(of(mockFloors));

    fixture = TestBed.createComponent(ParkingComponent);
    component = fixture.componentInstance;

    dialog = TestBed.inject(MatDialog);
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  // beforeEach(() => {

  //   dialog = TestBed.get(MatDialog);

  //   fixture.detectChanges();
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadFloor() on init', () => {
    spyOn(component, 'loadFloor');
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.loadFloor).toHaveBeenCalled();
  });

  it('should pass floor data to CardViewComponent', () => {
    const cardViewComponents = fixture.debugElement.queryAll(
      By.directive(CardViewComponent)
    );

    expect(cardViewComponents.length).toBe(2);

    expect(cardViewComponents[0].componentInstance.floor).toEqual(mockFloors[0]);
    expect(cardViewComponents[1].componentInstance.floor).toEqual(mockFloors[1]);
  });

  it('should open dialog with the correct data when openDialog() is called', async () => {
    spyOn(component, 'loadFloor');

    component.openDialog(); // Abre el diálogo

    // Obtiene el arnés del diálogo
    const dialogHarness = await loader.getHarness(MatDialogHarness);
    expect(dialogHarness).toBeTruthy(); // Verifica que el diálogo se abrió

    // Obtiene el texto del diálogo (si tiene contenido)
    const dialogText = await dialogHarness.getText();
    expect(dialogText).toBeTruthy(); // Asegura que el diálogo tiene contenido

    // Cierra el diálogo simulando `afterClosed()`
    await dialogHarness.close();

    // Verifica que `loadFloor()` se llamó después de cerrar el diálogo
    expect(component.loadFloor).toHaveBeenCalled();
  });
  
  
});
