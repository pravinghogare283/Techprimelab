import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  registeredCount: any;
  cancleCount: any;
  closeCount: any;
  startCount: any;

  constructor() { }

  ngOnInit(): void {
    this.registeredCount = localStorage.getItem('regCount');
    this.cancleCount = localStorage.getItem('cancleCount');
    this.closeCount = localStorage.getItem('closeCount');
    this.startCount = localStorage.getItem('startCount');
  }
}