import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Medium} from "../../_models";
import {MediumService} from "../../_services/medium.service";

@Component({
  selector: 'app-modal-medium',
  templateUrl: './modal-medium.component.html',
  styleUrls: ['./modal-medium.component.less']
})
export class ModalMediumComponent implements OnInit {

  mediumID : number;
  medium : Medium;
  consultationCallback : Function;

  constructor(@Inject(MAT_DIALOG_DATA) public config, public mediumService : MediumService) {
    this.mediumID = config.id;
    this.consultationCallback = config.consultationCallback;

    mediumService.getById(this.mediumID).subscribe((mediums) => console.log(this.medium = mediums));
  }

  ngOnInit() {
  }
}
