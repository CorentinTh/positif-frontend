import {Injectable} from '@angular/core';
import {Medium} from "../_models";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MediumService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Medium[]> {
    return this.http.get<any>(`${environment.apiUrl}?do=listMediums`).pipe(map(result => {
      return result.mediums;
    }));
  }

  getById(id: number): Observable<Medium> {
    return this.http.get<any>(`${environment.apiUrl}?do=getMedium&id=${id}`).pipe(map(result => {
      return result.medium;
    }));
  }
}


