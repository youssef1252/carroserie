import { CarsComponent } from './cars.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const CarsRoutes: Routes = [
  {
    path: '',
    component: CarsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(CarsRoutes)],
  exports: [RouterModule]
})
export class CarsRoutingModule { }
