import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {User} from '../_models';
import {environment} from "../../environments/environment";
import {Utils} from "../_helpers/utils";

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.get<any>(`${environment.apiUrl}?do=login&` + Utils.serialize({email, password}))
      .pipe(map(result => {
        // login successful if there's a jwt token in the response
        if (result && result.logged && result.user) {

          localStorage.setItem('currentUser', JSON.stringify(result.user));
          this.currentUserSubject.next(result.user);
        }

        return result && result.logged ? result.user : false;
      }));
  }

  register(user: Object) {
    return this.http.get<any>(`${environment.apiUrl}?do=register&` + Utils.serialize(user));
  }

  logout() {
    // remove user from local storage to log user out
    this.http.get<any>(`${environment.apiUrl}?do=logout`).subscribe((result) => {
      console.log(result);
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      location.reload(true);
    })
  }
}
/*






 */




