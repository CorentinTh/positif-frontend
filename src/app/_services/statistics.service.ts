import { Injectable } from '@angular/core';
import {ClientService} from "./client.service";
import { map } from 'rxjs/operators';


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

  constructor(private clientService : ClientService) { }

  getClientsAges(){
    return this.clientService.getAll().pipe(map(clients => {
      return clients.reduce((acc, client) => {

        const age = this.dateToAge(client.birthDate);
        const e = acc.find(o => o.label === age);

        if(!e) acc.push({label:age, value:1});
        else ++e.value;

        return acc;
      }, []).sort((a, b) => a.label - b.label);
    }));
  }


  dateToAge(dob:Date) {
    const ageDifMs = Date.now() - dob.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }


}
