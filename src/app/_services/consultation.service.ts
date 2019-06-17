import { Injectable } from '@angular/core';
import {Consultation, Employee, Medium} from "../_models";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  constructor(private http: HttpClient) { }

  getAllByClientId(id: number){
    return this.http.get<Consultation[]>(`${environment.apiUrl}/consultations/client/${id}`);
  }

  getAllByEmployeeId(id: number){
    return this.http.get<Consultation[]>(`${environment.apiUrl}/consultations/employee/${id}`);
  }

  getOneById(id: number){
    return this.http.get<Consultation>(`${environment.apiUrl}/consultations/${id}`);
  }
}
