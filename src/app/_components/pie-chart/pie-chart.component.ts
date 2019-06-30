import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Input} from "@angular/core";
import { Chart } from 'chart.js';


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.less']
})
export class PieChartComponent implements OnInit {
  @Input() data: any;
  @Input() xLabel: String = '';
  @Input() yLabel: String = '';

  @ViewChild('canvasChart') private chartEl;

  chart: any;

  constructor() { }

  ngOnInit() {

    this.chart = new Chart(this.chartEl.nativeElement, {
      type: 'pie',
      data: {
        labels: this.data.map(e => e.entry),
        datasets: [
          {
            data: this.data.map(e => e.count),
            backgroundColor:[
              '#673ab7',
              '#8843e2',
              '#a345ff',
            ],
          }
        ]
      },
      options: {

      }
    });
  }

}
