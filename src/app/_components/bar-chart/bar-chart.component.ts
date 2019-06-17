import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Input} from "@angular/core";
import { Chart } from 'chart.js';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.less']
})
export class BarChartComponent implements OnInit {
  @Input() data: any;
  @Input() xLabel: String = '';
  @Input() yLabel: String = '';

  @ViewChild('canvasChart') private chartEl;

  chart: any;

  constructor() { }

  ngOnInit() {

    this.chart = new Chart(this.chartEl.nativeElement, {
      type: 'bar',
      data: {
        labels: this.data.map(e => e.label),
        datasets: [
          {
            data: this.data.map(e => e.value),
            backgroundColor: '#673ab7',
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
