import { Component, OnInit } from '@angular/core';
import {Role} from "../_models";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.less']
})
export class ClientsComponent implements OnInit {

  displayedColumns: string[] = ['firstname'];
  clients = [
    {
      id: 1,
      password: 'admin',
      firstname: 'John',
      lastname: 'Doe',
      email: 'admin@positif.fr',
      role: Role.Employee
    },
    {
      id: 2,
      password: 'admin',
      firstname: 'John',
      lastname: 'Doe',
      email: 'admin@positif.fr',
      role: Role.Employee
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
