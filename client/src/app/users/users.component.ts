import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog } from '@angular/material';

import { UsersService } from '../services/users.service';
import { User } from '../models/user';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  users: User[];
  user: User;
  displayedColumns: string[];
  dataSource;
  userForm: FormGroup;
  userSubscribe: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private dialog: MatDialog
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

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

  openDialog(user: any): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { title: user.name, type: 'user', message: 'Voulez-vous supprimer cette utilisateur?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.remove(result);
      }
    });
  }

  modeEdit(user: any) {
    user.edited = !user.edited;
  }

  edit(event: any, user: User, field: string) {
    if (field === 'name') {
      user.name = event;
    }
    if (field === 'email') {
      user.email = event;
    }
    if (field === 'active') {
      user.active = event;
    }
    if (field === 'company') {
      user.company = event;
    }
    this.userService.userUpdate(user).subscribe(u => console.log(u));
  }

  private remove(user: any) {
    this.userService.userDelete(user._id).subscribe(data => {
      this.users = this.users.filter(u => u !== user);
      this.createTable();
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
        this.createTable();
      });
  }

  private createTable() {
    this.displayedColumns = ['name', 'email', 'company', 'active', 'solde', 'actions'];
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
