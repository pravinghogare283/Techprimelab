import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  loginForm: FormGroup = new FormGroup({});
  email: FormControl = new FormControl();
  password: FormControl = new FormControl();
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  ngOnInit(): void {
    this.createForm();
  }

  login() {
    if (this.loginForm.valid) {
      // this.authService.signInWithEmailPassword(this.email.value, this.password.value);
    }
  }

  createForm() {
    this.email = new FormControl('');
    this.password = new FormControl('');
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

}
