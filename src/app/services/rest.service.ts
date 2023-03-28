import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  allData:any;

  constructor(private http: HttpClient) { }

  getProjects() {
    return this.http.get("http://localhost:3000/project");
  }

  addProject(data: any) {
    return this.http.post("http://localhost:3000/project", data);
  }

  updateProject(id: number, data: any) {
    return this.http.put("http://localhost:3000/project/" + id, data);
  }
}