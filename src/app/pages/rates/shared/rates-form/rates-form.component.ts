import { Component, inject, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CardFormComponent } from '../../../../shared/cards/card-form/card-form.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material/material.module';

@Component({
  selector: 'app-rates-form',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './rates-form.component.html',
  styleUrl: './rates-form.component.scss'
})
export class RatesFormComponent {
readonly dialogRef = inject(MatDialogRef<CardFormComponent> );

  @Input() rate:any;

  public fb = inject(FormBuilder)

  public ratesForm: FormGroup = this.fb.group({
    name: [""],
    price: [],
  })


  onNoClick(): void {
    this.dialogRef.close(
      console.log()
    );
  }
}
