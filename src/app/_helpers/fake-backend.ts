import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {delay, mergeMap, materialize, dematerialize} from 'rxjs/operators';
import {Medium, Role, User} from '../_models';
import {mediums, employees, clients} from "../../assets/dummyData";

const users : User [] = [...employees, ...clients];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    const authHeader = request.headers.get('Authorization');
    const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');
    const roleString = isLoggedIn && authHeader.split('.')[1];
    const role = roleString ? Role[roleString] : null;

    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(() => {

      // authenticate - public
      if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
        const user = users.find(x => x.email === request.body.email && x.password === request.body.password);

        if (!user) return error('Adresse email ou mot de passe incorrect.');
        return ok({
          id: user.id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          role: user.role,
          token: `fake-jwt-token.${user.role}`
        });
      }

      // get user by id - admin or user (user can only access their own record)
      if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
        if (!isLoggedIn) return unauthorised();

        // get id from request url
        let urlParts = request.url.split('/');
        let id = parseInt(urlParts[urlParts.length - 1]);

        // only allow normal users access to their own record
        const currentUser = users.find(x => x.role === role);
        if (id !== currentUser.id && role !== Role.Employee) return unauthorised();

        const user = users.find(x => x.id === id);
        return ok(user);
      }

      // get all users (admin only)
      if (request.url.endsWith('/users') && request.method === 'GET') {
        if (role !== Role.Employee) return unauthorised();
        return ok(users);
      }

      // get all clients (admin only)
      if (request.url.endsWith('/clients') && request.method === 'GET') {
        if (role !== Role.Employee) return unauthorised();
        return ok(clients);
      }

      // get all users (admin only)
      if (request.url.endsWith('/users/current') && request.method === 'GET') {
        if (role !== Role.Employee && role !== Role.Client) return unauthorised();
        return ok(users[0]);
      }

      // get all mediums (admin and user only)
      if (request.url.endsWith('/mediums') && request.method === 'GET') {
        if (role !== Role.Employee && role !== Role.Client) return unauthorised();
        return ok(mediums);
      }

      if (request.url.match(/\/mediums\/\d+$/) && request.method === 'GET') {
        if (role !== Role.Employee && role !== Role.Client) return unauthorised();

        let urlParts = request.url.split('/');
        let id = parseInt(urlParts[urlParts.length - 1]);

        return ok(mediums.find(m => m.id === id));
      }


      // pass through any requests not handled above
      return next.handle(request);
    }))
    // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    // private helper functions

    function ok(body) {
      return of(new HttpResponse({status: 200, body}));
    }

    function unauthorised() {
      return throwError({status: 401, error: {message: 'Unauthorised'}});
    }

    function error(message) {
      return throwError({status: 400, error: {message}});
    }
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
