import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';

import { ModelesService } from './../services/modeles.service';
import { MarksService } from './../services/marks.service';
import { UsersService } from '../services/users.service';

import { Mark } from './../models/mark';
import { User } from '../models/user';
import { Modele } from '../models/modele';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit, OnDestroy {

  users: User[];
  marks: Mark[];
  modeles: Modele[];
  filteredUsers: Observable<User[]>;
  usersFrom: FormGroup;
  carsForm: FormGroup;
  displayPanel = false;
  userMarksSubscribe: any;
  ModelesSubscribe: any;
  moteurs = [
    { value: 'diesel', text: 'Diesel' },
    { value: 'essence', text: 'Essence' }
  ];

  constructor(
    private userService: UsersService,
    private marksService: MarksService,
    private modeleService: ModelesService,
    private fb: FormBuilder
  ) {
    this.prepareForm();
  }

  get formControls() { return this.carsForm.controls; }

  ngOnInit() {
    this.loadUsersMarks();
  }

  ngOnDestroy() {
    if (this.userMarksSubscribe !== undefined) {
      this.userMarksSubscribe.unsubscribe();
    }
  }

  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    const userSelected = this.users.filter(user => user.name === event.option.value)[0];
    this.handleInput(userSelected);
    this.formControls.user.setValue(userSelected.id);
    this.displayPanel = true;
  }

  handleEmptyInput(event: any) {
    if (event.target.value === '') {
      const userSelected = {
        email: '',
        phone: '',
        company: ''
      };
      this.handleInput(userSelected);
      this.displayPanel = false;
    }
  }

  changeValuesMarque() {
    const id = this.formControls.mark.value;
    this.loadModeles(id);
  }

  private loadUsersMarks() {
    const usersList = this.userService.getAll();
    const marksList = this.marksService.getAll();

    this.userMarksSubscribe = forkJoin([usersList, marksList]).subscribe(resultats => {
      this.users = resultats[0].filter(user => user.typeUser !== 'admin' && user.active);
      this.filteredUsers = this.usersFrom.get('usersFormNameUser').valueChanges
        .pipe(
          startWith(''),
          map(user => user ? this._filterUsers(user) : this.users.slice())
        );
      this.marks = resultats[1].filter(mark => mark.active);
    });
  }

  private _filterUsers(value: string) {
    const filterValue = value.toLowerCase();
    return this.users.filter(user => user.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private handleInput(userSelected) {
    this.usersFrom.patchValue({
      usersFormEmailUser: userSelected.email,
      usersFormTelUser: userSelected.phone,
      usersFormSocieteUser: userSelected.company
    });
  }

  private prepareForm() {
    this.usersFrom = new FormGroup({
      usersFormNameUser: new FormControl(),
      usersFormEmailUser: new FormControl({ value: '', disabled: true }),
      usersFormTelUser: new FormControl({ value: '', disabled: true }),
      usersFormSocieteUser: new FormControl({ value: '', disabled: true })
    });
    this.carsForm = this.fb.group({
      modele: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      chassis: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      immatriculation: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      circulation: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      moteur: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      couleur: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      mark: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      user: [
        Validators.compose([
          Validators.required
        ])
      ]
    });
  }

  private loadModeles(id: string) {
    this.ModelesSubscribe = this.modeleService.modelesByMark(id)
    .subscribe(modeles => {
      this.modeles = modeles.filter(modele => modele.active);
    });
  }

  add() {
    const inputs = this.formControls;
    console.log(inputs);
  }

}
