import { Component } from '@angular/core';
import {User} from "./_models/user";
import {Role} from "./_models/role";
import {AuthenticationService} from "./_services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'posit-if-front';
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Employee;
  }

  get isUser() {
    return this.currentUser && this.currentUser.role === Role.Client;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
