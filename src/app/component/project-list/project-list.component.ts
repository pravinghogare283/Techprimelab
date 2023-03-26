import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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
  projectList: any;

  displayedColumns: string[] = ['projectName', 'reason', 'type', 'division', 'category', 'priority', 'department', 'location', 'status', 'action'];
  dataSource: any;

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
    this.ser.getProjects().subscribe((res) => {
      this.projectList = res;
      const as = this.projectList.filter((val: any) => val.status === 'Start');
      const asc = this.projectList.filter((val: any) => val.status === 'Close');
      const asa = this.projectList.filter((val: any) => val.status === 'Cancle');
      const asaa = this.projectList.filter((val: any) => val.status === 'Registered');

      localStorage.setItem('regCount', asaa.length)
      localStorage.setItem('cancleCount', asa.length)
      localStorage.setItem('closeCount', asc.length)
      localStorage.setItem('startCount', as.length)
      const statusCount = asaa.length;
      this.dataSource = new MatTableDataSource(this.projectList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, (err) => {
      console.log(err);
    });
  }

  onStart(el: any, label: any) {
    let statusID = el.id;
    el.status = label;
    this.ser.updateProject(statusID, el).subscribe((res) => { });
    this.allProjects();
  }

  toDashboard() {
    this.route.navigate(['/dashboard']);
  }
}