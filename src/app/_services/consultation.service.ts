import {Injectable} from '@angular/core';
import {Consultation, Employee, Medium, Prediction, User} from "../_models";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Utils} from "../_helpers/utils";


@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  constructor(private http: HttpClient) {
  }

  getAllByUser(user: User): Observable<Consultation[]> {
    return this.http.get<any>(`${environment.apiUrl}?do=listConsultations&id=${user.id}`).pipe(map(results => {
      return results.consultations;
    }));
  }

  getAllByCurrentUser(): Observable<Consultation[]> {
    return this.http.get<any>(`${environment.apiUrl}?do=listCurrentUserConsultations`).pipe(map(results => {
      return results.consultations;
    }));
  }

  getOneById(id: number): Observable<Consultation> {
    return this.http.get<any>(`${environment.apiUrl}?do=getConsultation&id=${id}`).pipe(map(results => {
      return results.consultation;
    }));
  }

  initConsultation(medium: Medium) {
    console.log('in initConsultation');
    return this.http.get<any>(`${environment.apiUrl}?do=askForConsultation&id=${medium.id}`);
  }

  acceptConsultation(id: number) {
    console.log('in initConsultation');
    return this.http.get<any>(`${environment.apiUrl}?do=acceptConsultation&id=${id}`);
  }

  getCurrentConsultation(): Observable<Consultation> {
    return this.http.get<any>(`${environment.apiUrl}?do=getCurrentConsultation`).pipe(map(results => {
      return results.consultation;
    }));
  }

  getPredictions(id: number, loveLevel: number, healthLevel: number, workLevel: number): Observable<Prediction[]> {
    return this.http.get<any>(`${environment.apiUrl}?do=generatePredictions&` + Utils.serialize({
      id,
      loveLevel,
      healthLevel,
      workLevel
    })).pipe(map(results => {
      return results.predictions;
    }));
  }

  closeConsultation(id: number) {
    return this.http.get<any>(`${environment.apiUrl}?do=closeConsultation&id=${id}`);

  }
}
