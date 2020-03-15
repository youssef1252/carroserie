import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { config } from './../config';
import { Mark } from './../models/mark';

@Injectable({
  providedIn: 'root'
})
export class MarksService {

  marks: Observable<Mark[]>;
  constructor(private http: HttpClient) { }

  getAll(): Observable<Mark[]> {
    return this.http.get<Mark[]>(`${config.marks}`);
  }
}
