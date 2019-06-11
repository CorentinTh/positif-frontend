import {Component, OnInit, ViewChild} from '@angular/core';

import {Medium} from '../_models';
import {MediumService} from "../_services/medium.service";
import {ModalMediumComponent} from "./modal-medium/modal-medium.component";
import {MatDialog} from "@angular/material";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-mediums',
  templateUrl: './mediums.component.html',
  styleUrls: ['./mediums.component.less']
})
export class MediumsComponent implements OnInit {

  // mediums = ELEMENT_DATA;

  mediums: Medium[];
  searchValue: String = '';
  mediumType: String = '';

  searchFields: String[] = ['name', 'description', 'talent'];

  constructor(private mediumService: MediumService, public modalMedium: MatDialog, public route: ActivatedRoute, public router: Router) {

    if (this.router.url.match(/\/mediums\/\d+$/)) {
      this.route.children[0].paramMap.subscribe(p => {
        this.openModal(parseInt(p.get('id')));
      });
    }
  }

  openModal(id: number) {
    console.log('openModal with id = ' + id);
    this.router.navigate([id], {relativeTo: this.route});
    this.modalMedium
      .open(ModalMediumComponent, {
        data: {id},
        width: '400px'
      })
      .afterClosed()
      .subscribe(() => {
        this.router.navigate(['.'], {relativeTo: this.route});
      });
  }

  ngOnInit() {
    this.getMediums();
  }

  getMediums(): void {
    this.mediumService.getAll().subscribe(mediums => this.mediums = mediums);
  }
}
