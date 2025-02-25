import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';

@Component({
  selector: 'app-card-view',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './card-view.component.html',
  styleUrl: './card-view.component.scss'
})
export class CardViewComponent {
  @Input() title: string = 'Planta';
  @Input() isOperative: boolean = true;
  @Input() availableSpots: number = 0;
}
