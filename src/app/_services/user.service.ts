import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {User} from '../_models';
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<User[]> {
    return this.http.get<any>(`${environment.apiUrl}?do=listUser`).pipe(map(result => {
      return result.users;
    }));
  }

  // getById(id: number): Observable<User> {
  //   return this.http.get<any>(`${environment.apiUrl}?do=getUser&id=${id}`).pipe(map(result => {
  //     return result.user;
  //   }));
  // }

  getCurrent(): Observable<User> {
    return this.http.get<any>(`${environment.apiUrl}?do=getCurrentUser`).pipe(map(result => {
      return result.user;
    }));
  }
}
