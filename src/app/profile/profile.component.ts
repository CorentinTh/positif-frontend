import { Component, OnInit } from '@angular/core';
import {Client, Employee, User} from "../_models";
import {UserService} from "../_services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ClientService} from "../_services/client.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

  user: User | Client | Employee;
  error: String;
  isCurrent:boolean;

  constructor(public userService : UserService, public route: ActivatedRoute, public router: Router, public clientService : ClientService) {

    if (this.router.url.match(/\/users\/\d+$/)) {
      this.isCurrent = false;
      this.route.paramMap.subscribe(p => {
        this.clientService.getById(parseInt(p.get('id'))).subscribe(user => this.setUSer(user));
      });
    }else{
      this.isCurrent = true;
      this.userService.getCurrent().subscribe(user => this.setUSer(user));
    }
  }

  ngOnInit() {
  }

  setUSer(user : User){
    console.log(user);
    if(user){
      this.user = user;
    }else {
      this.error = 'L\'utilisateur demandé n\'existe pas.';
    }

  }
}
