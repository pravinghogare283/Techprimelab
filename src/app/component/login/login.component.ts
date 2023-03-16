import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // defEmail = 'sachin@gmail.com';
  // defPass = '12345'

  userName = localStorage.setItem('defalutEmail', 'sachin@gmail.com');
  passwardd = localStorage.setItem('defaultPassword', '12345');

  constructor(private route: Router) { }

  loginForm: FormGroup = new FormGroup({});
  email: FormControl = new FormControl();
  password: FormControl = new FormControl();
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.email = new FormControl('');
    this.password = new FormControl('');
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  // login() {
  //   let formData = this.loginForm.value
  //   if (formData.email === this.defEmail && formData.password === this.defPass) {
  //     this.route.navigate(['/dashboard']);
  //   }
  //   else {
  //     alert('Enter Valid Email or Passward');
  //   }
  // }

  login() {
    let formData = this.loginForm.value;
    let localData = localStorage.getItem('defalutEmail');
    let localPass = localStorage.getItem('defaultPassword');
    if (formData.email === localData && formData.password === localPass) {
      this.route.navigate(['/dashboard']);
    } else {
      alert('Enter Valid Email or Passward');
    }
  }

}