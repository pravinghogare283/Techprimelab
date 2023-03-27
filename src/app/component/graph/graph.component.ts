import { Component, OnInit } from '@angular/core';
import { Chart } from "chart.js";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  public chart: Chart;
  registeredCount: any;
  cancleCount: any;
  closeCount: any;
  startCount: any;

  c_strategy: any;
  r_strategy: any;
  c_finance: any;
  r_finance: any;
  c_maintenance: any;
  r_maintenance: any;
  c_store: any;
  r_store: any;
  c_quality: any;
  r_quality: any;

  constructor() { }

  ngOnInit(): void {
    this.grapgData();
    this.barChart();
    this.dataCounter();
  }

  dataCounter() {
    this.registeredCount = localStorage.getItem('regCount');
    this.cancleCount = localStorage.getItem('cancleCount');
    this.closeCount = localStorage.getItem('closeCount');
    this.startCount = localStorage.getItem('startCount');
  }

  grapgData() {
    this.c_strategy = localStorage.getItem('s&c');
    this.r_strategy = localStorage.getItem('s&r');
    this.c_finance = localStorage.getItem('f&c');
    this.r_finance = localStorage.getItem('f&r');
    this.c_maintenance = localStorage.getItem('m&c');
    this.r_maintenance = localStorage.getItem('m&r');
    this.c_store = localStorage.getItem('sr&c');
    this.r_store = localStorage.getItem('sr&r');
    this.c_quality = localStorage.getItem('q&c');
    this.r_quality = localStorage.getItem('q&r');
  }

  barChart() {
    this.chart = new Chart("canvas", {
      type: "bar",
      data: {
        labels: ["STR", "FIN", "QLT", "MAN", "STO"],
        datasets: [
          {
            label: "# of Votes",
            data: [this.c_strategy, this.c_finance, this.c_maintenance, this.c_store, this.c_quality],
            backgroundColor: [
              "blue", "blue", "blue",
              "blue", "blue"
            ]
          },
          {
            label: "# of Votes",
            data: [this.r_strategy, this.r_finance, this.r_maintenance, this.r_store, this.r_quality],
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
}