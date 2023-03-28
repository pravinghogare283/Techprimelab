import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = ['projectName', 'reason', 'type', 'division', 'category', 'priority', 'department', 'location', 'status', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private ser: RestService, private route: Router) { }

  ngOnInit(): void {
    this.allProjects();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Get All Project List :
  allProjects() {
    this.dataSource = this.ser.allData;
    console.log(this.dataSource)
  }

  onClick(el: any, label: string) {
    let statusID = el.id;
    el.status = label;
    this.ser.updateProject(statusID, el).subscribe((res) => { });
    this.allProjects();
  }

  toDashboard() {
    this.route.navigate(['/dashboard']);
  }
}