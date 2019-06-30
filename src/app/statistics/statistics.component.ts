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

  clientsAge: [];
  clientCountPerDay: [];
  consultationsCountByStatus: any;
  clientCountPerEmployee: any;

  ngOnInit() {
    this.statisticsService.getClientsAges().subscribe(clientsAge => {
      this.clientsAge = clientsAge;
    });

    this.statisticsService.getConsultationsCountPerDay().subscribe(results => {
      console.log(results);
      this.clientCountPerDay = results;
    });

    this.statisticsService.getConsultationsCountByStatus().subscribe(results => {
      console.log(results);
      this.consultationsCountByStatus = results;

      this.consultationsCountByStatus = this.consultationsCountByStatus.map(v => {
        v.entry =
          v.entry === 'CLOSED' ? 'Terminé' :
            v.entry === 'PENDING' ? 'En cours' :
              v.entry === 'WAITING_VALIDATION' ? 'En attente' :
                v.entry;

        return v;
      })
    });

    this.statisticsService.getConsultationsCountPerEmployee().subscribe(results => {
      console.log(results);
      this.clientCountPerEmployee = results;

      this.clientCountPerEmployee = this.clientCountPerEmployee.filter(v => v.count > 0).map(v => {
        v.entry = v.entry.firstname + ' ' + v.entry.lastname;
        return v;
      })

    });
  }

}
