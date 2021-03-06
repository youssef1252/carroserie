import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';

import { ModelesService } from './../services/modeles.service';
import { MarksService } from './../services/marks.service';
import { UsersService } from '../services/users.service';
import { CarsService } from './../services/cars.service';

import { Mark } from './../models/mark';
import { User } from '../models/user';
import { Modele } from '../models/modele';
import { Car } from '../models/car';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit, OnDestroy {

  users: User[];
  marks: Mark[];
  modeles: Modele[];
  car: Car;
  cars: Car[];
  filteredUsers: Observable<User[]>;
  usersFrom: FormGroup;
  carsForm: FormGroup;
  displayPanel = false;
  userMarksSubscribe: any;
  ModelesSubscribe: any;
  carsSubscribe: any;
  moteurs = [
    { value: 'diesel', text: 'Diesel' },
    { value: 'essence', text: 'Essence' }
  ];
  type = 'cars';

  constructor(
    private userService: UsersService,
    private marksService: MarksService,
    private modeleService: ModelesService,
    private carService: CarsService,
    private fb: FormBuilder
  ) {
    this.prepareForm();
  }

  get formControls() { return this.carsForm.controls; }

  ngOnInit() {
    this.loadUsersMarks();
    this.loadCars();
  }

  ngOnDestroy() {
    if (this.userMarksSubscribe !== undefined) {
      this.userMarksSubscribe.unsubscribe();
    }
  }

  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    const userSelected = this.users.filter(user => user.name === event.option.value)[0];
    this.handleInput(userSelected);
    this.formControls.user.setValue(userSelected._id);
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

  add() {
    const inputs = this.formControls;
    this.car = {
      user: inputs.user.value,
      modele: inputs.modele.value,
      mark: inputs.mark.value,
      chassis: inputs.chassis.value,
      immatriculation: inputs.immatriculation.value,
      circulation: inputs.circulation.value,
      moteur: inputs.moteur.value,
      couleur: inputs.couleur.value
    };
    this.carService.carAdd(this.car).subscribe(car => {
      this.loadCars();
      this.prepareForm();
    });
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

  private loadCars() {
    this.carsSubscribe = this.carService.getAll()
    .subscribe(
      cars => {
        this.cars = cars;
      }
    );
  }

}
