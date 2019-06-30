import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Input} from "@angular/core";
import { Chart } from 'chart.js';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.less']
})
export class LineChartComponent implements OnInit {
  @Input() data: any;
  @Input() xLabel: String = '';
  @Input() yLabel: String = '';

  @ViewChild('canvasChart') private chartEl;

  chart: any;

  constructor() { }

  ngOnInit() {

    this.chart = new Chart(this.chartEl.nativeElement, {
      type: 'line',
      data: {
        labels: this.data.map(e => e.day + '/06/2019'),
        datasets: [
          {
            data: this.data.map(e => e.count),
            backgroundColor: 'rgba(103,58,183,0.45)',
            borderColor: '#673ab7',
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true,
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            },
            scaleLabel: {
              display: true,
              labelString: this.xLabel
            },
          }],

          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: this.yLabel
            },
            display: true,
            ticks: {
              stepSize: 1,
              beginAtZero: true
            },
            gridLines: {
              color: "#eee",
            },
            precision:0
          }],
        }
      }
    });
  }

}
