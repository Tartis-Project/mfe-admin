
import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardViewComponent } from '../../../../shared/cards/card-view/card-view.component';
import { MaterialModule } from '../../../../material/material.module';
import { CardFormComponent } from '../../../../shared/cards/card-form/card-form.component';
import { ParkingService } from '../../services/parking.service';
import { Floor } from '../../interfaces/floor.model';


@Component({
  selector: 'app-parking',
  standalone: true,
  imports: [CardViewComponent, MaterialModule],
  templateUrl: './parking.component.html',
  styleUrl: './parking.component.scss'
})
export class ParkingComponent implements OnInit{

  public floors: Floor[] = []

  constructor(
    readonly dialog: MatDialog,
    private parkingService: ParkingService
  ){

  }

  ngOnInit(): void {
    this.loadFloor()
  }

  loadFloor(){
    console.log("hola")
    this.parkingService.getFloors().subscribe((floors) => {
      this.floors = floors

    })
  }

    openDialog(): void {
      let dialogData:any = {}
      let dialogRef = this.dialog.open(CardFormComponent, {
        width: '50%',
        height: 'auto',
        data: dialogData
      });

      dialogRef.afterClosed().subscribe(() => {
        this.loadFloor();
      });
    }
}


