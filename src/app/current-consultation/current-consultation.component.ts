import {Component, OnInit} from '@angular/core';
import {ConsultationService} from "../_services/consultation.service";
import {Consultation, Prediction} from "../_models";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-current-consultation',
  templateUrl: './current-consultation.component.html',
  styleUrls: ['./current-consultation.component.less']
})
export class CurrentConsultationComponent implements OnInit {
  consultation: Consultation;
  predictions: Prediction[];
  loveLevel: number = 4;
  healthLevel: number = 4;
  workLevel: number = 4;
  now : Date = new Date();

  closeComment: String;
  closeDate : Date = new Date();
  closeTime : String = `${new Date().getHours()}:${new Date().getMinutes()}`;

  lovePrediction: Prediction;
  healthPrediction: Prediction;
  workPrediction: Prediction;

  constructor(public consultationService: ConsultationService, public router: Router, public snack : MatSnackBar) {
  }

  ngOnInit() {
    this.consultationService.getCurrentConsultation().subscribe(consultation => {
      this.consultation = consultation;
      console.log(consultation);
      this.getNewPredictions();
    });

    setInterval(() => {
      this.now = new Date();
    }, 1000);
  }

  getNewPredictions() {
    this.consultationService.getPredictions(this.consultation.id, this.loveLevel, this.healthLevel, this.workLevel).subscribe(predictions => {
      console.log(this.predictions = predictions);
      this.lovePrediction = predictions.find(p => p.type === 'LOVE');
      this.healthPrediction = predictions.find(p => p.type === 'HEALTH');
      this.workPrediction = predictions.find(p => p.type === 'WORK');
    });
  }

  closeConsultation(){
    this.consultationService.closeConsultation(this.consultation.id).subscribe(results => {
      console.log(results);
      this.router.navigate(['/consultations']);
      this.snack.open('La consultation a bien été terminée !', '');

    });
  }

  randomLevel() {
    const r = () => Math.floor(Math.random()*4 +1);

    this.loveLevel = r();
    this.healthLevel = r();
    this.workLevel = r();
    this.getNewPredictions();
  }
}

//gaëtan.riviere@positif.fr
