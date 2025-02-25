import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';

@Component({
  selector: 'app-card-view',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './card-view.component.html',
  styleUrl: './card-view.component.scss'
})
export class CardViewComponent {
  isOperative = signal<boolean>(true);

  toggleOperative(): void {
    this.isOperative.update(value => !value);
  }


}
