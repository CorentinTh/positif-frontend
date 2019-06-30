import { Injectable } from '@angular/core';
import {ClientService} from "./client.service";
import { map } from 'rxjs/operators';
import {Observable} from "rxjs";
import {User} from "../_models";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";


const groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private clientService : ClientService, private http: HttpClient) { }

  getClientsAges(): Observable<any> {
    return this.clientService.getAll().pipe(map(clients => {
      return clients.reduce((acc, client) => {

        const age = this.dateToAge(new Date(client.birthDate));
        const e = acc.find(o => o.entry === age);

        if(!e) acc.push({entry:age, count:1});
        else ++e.value;

        return acc;
      }, []).sort((a, b) => a.entry - b.entry);
    }));
  }

  dateToAge(dob:Date) {
    const ageDifMs = Date.now() - dob.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  getConsultationsCountPerDay(): Observable<[]> {
    return this.http.get<any>(`${environment.apiUrl}?do=getConsultationsCountPerDay`).pipe(map(result => {
      return result.map;
    }));
  }

  getConsultationsCountPerEmployee(): Observable<[]> {
    return this.http.get<any>(`${environment.apiUrl}?do=getClientsCountByEmployee`).pipe(map(result => {
      return result.map;
    }));
  }

  getConsultationsCountByStatus(): Observable<[]> {
    return this.http.get<any>(`${environment.apiUrl}?do=getConsultationsCountByStatus`).pipe(map(result => {
      return result.map;
    }));
  }

}
