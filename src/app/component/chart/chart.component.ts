import { Component, OnInit } from '@angular/core';
import { Chart } from "chart.js";
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  public chart: Chart;
  ngOnInit() {
    this.chart = new Chart("canvas", {
      type: "bar",
      data: {
        labels: ["STR", "FRN", "OLT", "MAN", "STO", "HR"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "blue", "blue", "blue",
              "blue", "blue", "blue"
            ]
          },
          {
            label: "# of Votes",
            data: [15, 10, 6, 10, 4, 6],
            backgroundColor: [
              "green", "green", "green",
              "green", "green", "green"
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
}

