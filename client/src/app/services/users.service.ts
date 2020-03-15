import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../models/user';
import { config } from './../config';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${config.users}`);
  }

  userAdd(user: User) {
    return this.http.post(`${config.userAdd}`, user);
  }

  userDelete(id: string) {
    return this.http.delete(`${config.user}/${id}`);
  }

  userUpdate(user: any) {
    return this.http.put(`${config.user}/${user._id}`, user);
  }
}
