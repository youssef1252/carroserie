// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// end angular

// users
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
// end users

// Material
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
// end material

// module data-list
import { DataListedModule } from '../data-listed/data-listed.module';
// end module data-list

@NgModule({
  declarations: [
    // users
    UsersComponent,
  ],
  imports: [
    // Angular
    CommonModule,
    ReactiveFormsModule,
    DataListedModule,
    // Users
    UsersRoutingModule,
    // // Material
    MatIconModule,
    MatGridListModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class UsersModule { }
