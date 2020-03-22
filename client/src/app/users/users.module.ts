// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// end material

// users
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
// end users

// Material
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
// end material

@NgModule({
  declarations: [
    // users
    UsersComponent
  ],
  imports: [
    // angular
    CommonModule,
    ReactiveFormsModule,
    // users
    UsersRoutingModule,
    // material
    MatIconModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatChipsModule,
    MatButtonModule,
    MatTooltipModule,
    MatSortModule,
    MatPaginatorModule,
    MatListModule
  ]
})
export class UsersModule { }
