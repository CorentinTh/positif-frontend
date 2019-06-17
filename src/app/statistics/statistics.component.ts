import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {StatisticsService} from "../_services/statistics.service";
import {Client} from "../_models";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class StatisticsComponent implements OnInit {

  constructor(private statisticsService: StatisticsService) {
  }

  clientsAge: {};

  ngOnInit() {
    this.statisticsService.getClientsAges().subscribe(clientsAge => {
      this.clientsAge = clientsAge;
    })
  }

}
