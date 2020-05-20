import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
// end material

import { DataListedComponent } from './data-listed.component';

@NgModule({
  declarations: [
    DataListedComponent
  ],
  imports: [
    CommonModule,
    // Material
    MatIconModule,
    MatGridListModule,
    MatInputModule,
    MatTableModule,
    MatChipsModule,
    MatButtonModule,
    MatTooltipModule,
    MatSortModule,
    MatPaginatorModule,
    MatListModule
  ],
  exports: [
    DataListedComponent
  ]
})
export class DataListedModule { }
