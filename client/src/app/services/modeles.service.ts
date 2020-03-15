import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { config } from './../config';
import { Modele } from './../models/modele';

@Injectable({
  providedIn: 'root'
})
export class ModelesService {

  constructor(private http: HttpClient) { }

  modelesByMark(id: string): Observable<Modele[]> {
    return this.http.get<Modele[]>(`${config.modelesByMark}/${id}`);
  }
}
