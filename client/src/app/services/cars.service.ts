import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Car } from '../models/car';
import { config } from './../config';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Car[]> {
    return this.http.get<Car[]>(`${config.cars}`);
  }

  carAdd(car: Car) {
    return this.http.post(`${config.cars}`, car);
  }

  carDelete(id: string) {
    return this.http.delete(`${config.car}/${id}`);
  }

  carUpdate(car: Car) {
    return this.http.put(`${config.car}/${car._id}`, car._id);
  }
}
