import { Injectable } from '@angular/core';
import {Client, User} from "../_models";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }


  getAll() : Observable<Client[]> {
    return this.http.get<any>(`${environment.apiUrl}?do=listClients`).pipe(map( result => {
      if(result.clients){
        return result.clients
      }else{
        console.log('Error while fetching clients');
      }
    }));
  }
}
