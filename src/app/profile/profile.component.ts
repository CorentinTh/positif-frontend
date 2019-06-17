import { Component, OnInit } from '@angular/core';
import {User} from "../_models";
import {UserService} from "../_services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

  user: User;
  error: String;
  isCurrent:boolean;

  constructor(public userService : UserService, public route: ActivatedRoute, public router: Router) {

    if (this.router.url.match(/\/users\/\d+$/)) {
      this.isCurrent = false;
      this.route.paramMap.subscribe(p => {
        this.userService.getById(parseInt(p.get('id'))).subscribe(user => this.setUSer(user));
      });
    }else{
      this.isCurrent = true;
      this.userService.getCurrent().subscribe(user => this.setUSer(user));
    }
  }

  ngOnInit() {
  }

  setUSer(user : User){
    if(user){
      this.user = user;
    }else {
      this.error = 'L\'utilisateur demandé n\'existe pas.';
    }

  }
}
