import { Component, OnInit } from '@angular/core';
import { Chart } from "chart.js";
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  v1: any;
  v2: any;
  v3: any;
  v4: any;
  v5: any;
  v6: any;
  v7: any;
  v8: any;
  v9: any;
  v10: any;

  public chart: Chart;
  ngOnInit() {
    this.grapgData();

    this.chart = new Chart("canvas", {
      type: "bar",
      data: {
        labels: ["STR", "FIN", "QLT", "MAN", "STO"],
        datasets: [
          {
            label: "# of Votes",
            data: [this.v1, this.v3, this.v5, this.v7, this.v9],
            backgroundColor: [
              "blue", "blue", "blue",
              "blue", "blue"
            ]
          },
          {
            label: "# of Votes",
            data: [this.v2, this.v4, this.v6, this.v8, this.v10],
            backgroundColor: [
              "green", "green", "green",
              "green", "green"
            ]
          }
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }

  grapgData() {
    this.v1 = localStorage.getItem('s&c');
    this.v2 = localStorage.getItem('s&r');
    this.v3 = localStorage.getItem('f&c');
    this.v4 = localStorage.getItem('f&r');
    this.v5 = localStorage.getItem('m&c');
    this.v6 = localStorage.getItem('m&r');
    this.v7 = localStorage.getItem('sr&c');
    this.v8 = localStorage.getItem('sr&r');
    this.v9 = localStorage.getItem('q&c');
    this.v10 = localStorage.getItem('q&r');
  }
}

