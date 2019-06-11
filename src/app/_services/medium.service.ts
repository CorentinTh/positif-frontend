import { Injectable } from '@angular/core';
import {Medium} from "../_models";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MediumService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Medium[]>(`${environment.apiUrl}/mediums`);
  }

  getById(id: number){
    return this.http.get<Medium>(`${environment.apiUrl}/mediums/${id}`);
  }
}
