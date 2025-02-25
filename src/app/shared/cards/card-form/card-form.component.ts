import { Component, Inject, inject } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-card-form',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './card-form.component.html',
  styleUrl: './card-form.component.scss'
})
export class CardFormComponent {
  readonly dialogRef = inject(MatDialogRef<CardFormComponent> );

  public floor: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {floor: number, places: number, operative: boolean}) {
    this.floor = data;
   }



  onNoClick(): void {
    this.dialogRef.close(
      console.log(this.data)
    );
  }
}
