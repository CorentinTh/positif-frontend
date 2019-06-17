import {Component, OnInit} from '@angular/core';
import {ConsultationService} from "../_services/consultation.service";
import {Consultation, ConsultationState, Role, User} from "../_models";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.less']
})
export class ConsultationsComponent implements OnInit {

  user: User;
  error: String;
  consultations: Consultation[];
  displayedColumns = ['state', 'createdAt', 'client'];

  constructor(private consultationService: ConsultationService, public route: ActivatedRoute, public router: Router, public userService: UserService) {
    if (this.router.url.match(/\/consultations\/\d+$/)) {
      this.route.paramMap.subscribe(p => {
        this.userService.getById(parseInt(p.get('id'))).subscribe(user => this.getConsultations(user));
      });
    } else {
      this.userService.getCurrent().subscribe(user => this.getConsultations(user));
    }
  }

  ngOnInit() {

  }

  getConsultations(user: User) {
    if (user) {
      this.user = user;

      if (this.user.role === Role.Employee) {
        this.consultationService.getByEmployeeId(this.user.id).subscribe(consultations => console.log(this.consultations = consultations));
      } else {
        this.consultationService.getByClientId(this.user.id).subscribe(consultations => console.log(this.consultations = consultations));
      }
    } else {
      this.error = 'L\'utilisateur demandé n\'existe pas.';
    }
  }

}
