import {Component, OnInit} from '@angular/core';
import {ConsultationService} from "../_services/consultation.service";
import {Consultation, Role, User} from "../_models";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../_services/user.service";
import {MatDialog} from "@angular/material";
import {ModalConsultationComponent} from "./modal-consultation/modal-consultation.component";

@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.less']
})
export class ConsultationsComponent implements OnInit {

  user: User;
  error: String;
  consultations: Consultation[];
  displayedColumns = ['state', 'createdAt', 'medium', 'client', 'actions'];

  constructor(private consultationService: ConsultationService, public route: ActivatedRoute, public router: Router, public userService: UserService, public modal: MatDialog) {
    if (this.router.url.match(/\/consultations\/user\/\d+$/)) {
      this.route.paramMap.subscribe(p => {
        this.userService.getById(parseInt(p.get('id'))).subscribe(user => this.getConsultations(user));
      });
    } else if (this.router.url.match(/\/consultations\/\d+$/)) {

      this.route.children[0].paramMap.subscribe(p => {
        this.openModal(parseInt(p.get('id')));
      });

      this.userService.getCurrent().subscribe(user => this.getConsultations(user));

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
        this.consultationService.getAllByEmployeeId(this.user.id).subscribe(consultations => console.log(this.consultations = consultations));
      } else {
        this.consultationService.getAllByClientId(this.user.id).subscribe(consultations => console.log(this.consultations = consultations));
      }
    } else {
      this.error = 'L\'utilisateur demandé n\'existe pas.';
    }
  }

  private openModal(id: number) {
    this.router.navigate([id], {relativeTo: this.route});
    this.modal
      .open(ModalConsultationComponent, {
        data: {id},
        width: '400px'
      })
      .afterClosed()
      .subscribe(() => {
        this.router.navigate(['.'], {relativeTo: this.route});
      });
  }
}
