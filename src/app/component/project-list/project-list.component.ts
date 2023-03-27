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

      const s_close = this.projectList.filter((v: any) => v.department === 'Strategy' && v.status === 'Close');
      const s_registered = this.projectList.filter((v: any) => v.department === 'Strategy' && v.status === 'Registered')
      localStorage.setItem('s&c', s_close.length);
      localStorage.setItem('s&r', s_registered.length);
      console.log(s_close.length)
      console.log(s_registered.length)


      const f_registered = this.projectList.filter((v: any) => v.department === 'Finance' && v.status === 'Registered')
      const f_close = this.projectList.filter((v: any) => v.department === 'Finance' && v.status === 'Close');
      localStorage.setItem('f&c', f_close.length);
      localStorage.setItem('f&r', f_registered.length);

      const m_close = this.projectList.filter((v: any) => v.department === 'Maintenance' && v.status === 'Close');
      const m_registered = this.projectList.filter((v: any) => v.department === 'Maintenance' && v.status === 'Registered')
      localStorage.setItem('m&c', m_close.length);
      localStorage.setItem('m&r', m_registered.length);

      const sr_close = this.projectList.filter((v: any) => v.department === 'Strategy' && v.status === 'Close');
      const sr_registered = this.projectList.filter((v: any) => v.department === 'Strategy' && v.status === 'Registered')
      localStorage.setItem('sr&c', sr_close.length);
      localStorage.setItem('sr&r', sr_registered.length);

      const q_close = this.projectList.filter((v: any) => v.department === 'Quality' && v.status === 'Close');
      const q_registered = this.projectList.filter((v: any) => v.department === 'Quality' && v.status === 'Registered')
      localStorage.setItem('q&c', q_close.length);
      localStorage.setItem('q&r', q_registered.length);

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