import { Component, OnInit } from '@angular/core';
import {ConsultationService} from "../_services/consultation.service";
import {Consultation} from "../_models";

@Component({
  selector: 'app-current-consultation',
  templateUrl: './current-consultation.component.html',
  styleUrls: ['./current-consultation.component.less']
})
export class CurrentConsultationComponent implements OnInit {
  consultation: Consultation;

  constructor(public consultationService : ConsultationService) { }

  ngOnInit() {
    this.consultationService.getCurrentConsultation().subscribe(consultation => console.log(this.consultation = consultation));
  }

}
