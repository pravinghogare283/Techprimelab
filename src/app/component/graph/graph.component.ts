import { Component, OnInit } from '@angular/core';
import { Chart } from "chart.js";
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  public chart: Chart;
  data: any;
  delay: any;
  delayDate: any;

  cancleCount: number;
  closeCount: number;
  startCount: number;
  totalCount: number;

  c_strategy: number;
  r_strategy: number;
  c_finance: number;
  r_finance: number;
  c_maintenance: number;
  r_maintenance: number;
  c_store: number;
  r_store: number;
  c_quality: number;
  r_quality: number;
  r_lity: any;
  newDate: any = [];

  constructor(private ser: RestService) {
  }

  ngOnInit(): void {
    this.projectList();
  }

  projectList() {
    this.ser.getProjects().subscribe((res) => {
      this.data = res;
      this.totalCount = this.data.length;
      const started = this.data.filter((val: any) => val.status === 'Start');
      this.startCount = started.length;
      const closed = this.data.filter((val: any) => val.status === 'Close');
      this.closeCount = closed.length;
      const cancled = this.data.filter((val: any) => val.status === 'Cancle');
      this.cancleCount = cancled.length;

      const s_close = this.data.filter((v: any) => v.department === 'Strategy' && v.status === 'Close');
      this.c_strategy = s_close.length;

      const s_registered = this.data.filter((v: any) => v.department === 'Strategy');
      this.r_strategy = s_registered.length;

      const f_close = this.data.filter((v: any) => v.department === 'Finance' && v.status === 'Close');
      this.c_finance = f_close.length;

      const f_registered = this.data.filter((v: any) => v.department === 'Finance');
      this.r_finance = f_registered.length;

      const m_close = this.data.filter((v: any) => v.department === 'Maintenance' && v.status === 'Close');
      this.c_maintenance = m_close.length;

      const m_registered = this.data.filter((v: any) => v.department === 'Maintenance');
      this.r_maintenance = m_registered.length;

      const sr_close = this.data.filter((v: any) => v.department === 'Store' && v.status === 'Close');
      this.c_store = sr_close.length;

      const sr_registered = this.data.filter((v: any) => v.department === 'Store');
      this.r_store = sr_registered.length;

      const q_close = this.data.filter((v: any) => v.department === 'Quality' && v.status === 'Close');
      this.c_quality = q_close.length;

      const q_registered = this.data.filter((v: any) => v.department === 'Quality');
      this.r_quality = q_registered.length;

      const q_tered = this.data.filter((v: any) => {
        let today = new Date();
        let date = new Date(v.endDate);
        this.delay = today > date;
        if (today > date) {
          this.newDate.push(this.delay);
          this.delayDate = this.newDate.length;
        }
      });

      // Graph Values Added :
      this.barChart();
      // Send data to service
      this.ser.allData = this.data;
    });
  }

  barChart() {
    this.chart = new Chart("canvas", {
      type: "bar",
      data: {
        labels: ["STR", "FIN", "STO", "MAN", "QLT"],
        datasets: [
          {
            label: "Registered Projects",
            data: [this.r_strategy, this.r_finance, this.r_store, this.r_maintenance, this.r_quality],
            backgroundColor: [
              "blue", "blue", "blue",
              "blue", "blue"
            ]
          },
          {
            label: "Closed Projects",
            data: [this.c_strategy, this.c_finance, this.c_store, this.c_maintenance, this.c_quality],
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