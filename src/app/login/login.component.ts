import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import * as firebase from 'firebase/compat';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private loginService: LoginService, private router: Router) { }


  ngOnInit(): void {

  }

  error: string = '';

  login(form:NgForm){
    const email=form.value.email;
    const password=form.value.password;
    this.loginService.login(email, password);
  }

  goToRegister() {
    this.router.navigate(['/registro']);
  }
  
}


