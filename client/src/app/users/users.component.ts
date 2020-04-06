import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

import { UsersService } from '../services/users.service';
import { User } from '../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  users: User[];
  user: User;
  userForm: FormGroup;
  userSubscribe: any;
  type = 'users';

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
  ) {
    this.prepareForm();
   }

  ngOnInit() {
    this.loadUsers();
  }

  ngOnDestroy() {
    if (this.userSubscribe !== undefined) {
      this.userSubscribe.unsubscribe();
    }
  }

  get formControls() { return this.userForm.controls; }

  add() {
    const inputs = this.formControls;
    this.user = {
      name: inputs.name.value,
      email: inputs.email.value,
      company: inputs.company.value,
      adress: inputs.adress.value,
      phone: inputs.phone.value,
      password: 'client'
    };
    this.userService.userAdd(this.user).subscribe(user => {
      this.loadUsers();
      this.prepareForm();
    });
  }

  private prepareForm() {
    this.userForm = this.fb.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ])
      ],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email]
        )],
      phone: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
        ])
      ],
      adress: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(80),
        ])
      ],
      company: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
    });
  }

  private loadUsers() {
    this.userSubscribe = this.userService.getAll()
      .subscribe(users => {
        this.users = users.filter(user => user.typeUser !== 'admin');
      });
  }
}
