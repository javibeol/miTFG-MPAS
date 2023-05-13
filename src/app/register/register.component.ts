import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../login/login.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  error: string = '';

  constructor(private loginService: LoginService, private router: Router) { }

  register(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const username = form.value.username;

    // Crea una cuenta de usuario con correo y contraseña
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(response => {
        // Realiza acciones adicionales después de que se haya creado la cuenta de usuario
        console.log('Usuario registrado exitosamente:', response.user);
        //this.loginService.login(email, password); // Inicia sesión automáticamente después del registro
        this.router.navigate(['/login']);
      })
      .catch(error => {
        // Maneja los errores del registro
        console.error('Error al registrar el usuario:', error);
        this.error = error.message;
      });
  }
}
