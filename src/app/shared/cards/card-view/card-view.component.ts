import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { CardFormComponent } from '../card-form/card-form.component';

@Component({
  selector: 'app-card-view',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './card-view.component.html',
  styleUrl: './card-view.component.scss'
})
export class CardViewComponent {
  readonly dialog = inject(MatDialog);
  isOperative = signal<boolean>(true);

  toggleOperative(): void {
    this.isOperative.update(value => !value);
  }

  openDialog(): void {
    this.dialog.open(CardFormComponent, {
      width: '50%',
      height: 'auto',
      data: { floor: 1, places: 120, operative: this.isOperative() },
    });
  }


}
