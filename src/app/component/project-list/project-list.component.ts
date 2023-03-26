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
  projectList: any;
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
    this.ser.getProjects().subscribe((res) => {
      this.projectList = res;
      const started = this.projectList.filter((val: any) => val.status === 'Start');
      const closed = this.projectList.filter((val: any) => val.status === 'Close');
      const cancled = this.projectList.filter((val: any) => val.status === 'Cancle');
      const registered = this.projectList.filter((val: any) => val.status === 'Registered');

      localStorage.setItem('regCount', registered.length);
      localStorage.setItem('cancleCount', cancled.length);
      localStorage.setItem('closeCount', closed.length);
      localStorage.setItem('startCount', started.length);

      this.dataSource = new MatTableDataSource(this.projectList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, (err) => {
      console.log(err);
    });
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