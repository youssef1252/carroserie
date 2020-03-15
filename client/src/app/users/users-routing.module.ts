import { UsersComponent } from './users.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const UsersRoutes: Routes = [
  {
    path: '',
    component: UsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(UsersRoutes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
