import { Injectable } from '@angular/core';
import {Client, User} from "../_models";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }


  getAll() {
    return this.http.get<Client[]>(`${environment.apiUrl}/clients`);
  }
}
