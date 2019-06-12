import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Role, User} from "../_models";
import {ClientService} from "../_services/client.service";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ClientsComponent implements OnInit {

  displayedColumns: string[] = ['firstname', 'lastname', 'phone'];
  clients: User[];
  searchQuery: String;

  constructor(public clientServices: ClientService) {
    clientServices.getAll().subscribe(users => this.clients = users);
  }

  ngOnInit() {
  }

}
