import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";
import {ConsultationService} from "../../_services/consultation.service";
import {Consultation, User} from "../../_models";
import {AuthenticationService} from "../../_services/authentication.service";

@Component({
  selector: 'app-modal-consultation',
  templateUrl: './modal-consultation.component.html',
  styleUrls: ['./modal-consultation.component.less']
})
export class ModalConsultationComponent implements OnInit {

  consultationID: number;
  consultation: Consultation;
  user : User;

  constructor(@Inject(MAT_DIALOG_DATA) public config, public consultationService : ConsultationService, public authenticationService : AuthenticationService) {
    this.consultationID = config.id;
    this.user = this.authenticationService.currentUserValue;
    consultationService.getOneById(this.consultationID).subscribe(c => this.consultation = c);
  }

  ngOnInit() {
  }

}
