import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projectList: any;

  constructor(private ser: RestService, private route: Router) { }

  ngOnInit(): void {
    this.allProjects();
  }

  // Get All Project List :
  allProjects() {
    this.ser.getProjects().subscribe((res) => {
      this.projectList = res;
      console.log(res)
    }, (err) => {
      console.log(err);
    });
  }

  toDashboard() {
    this.route.navigate(['/dashboard']);
  }

}
