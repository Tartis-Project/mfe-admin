import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  exports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule
  ]
})
export class MaterialModule { }
