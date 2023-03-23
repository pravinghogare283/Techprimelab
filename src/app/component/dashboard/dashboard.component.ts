import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  projectList: boolean = false;
  createProject: boolean = false;
  graph: boolean = true;

  constructor() { }

  ngOnInit(): void { }

  onAdd() {
    this.createProject = true;
    this.projectList = false;
    this.graph = false;
  }

  onList() {
    this.createProject = false;
    this.projectList = true;
    this.graph = false;
  }

  changeRoute() {
    this.createProject = false;
    this.projectList = false;
    this.graph = true;
  }
}
