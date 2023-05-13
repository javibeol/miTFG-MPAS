import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class LoginService {

  constructor(private router:Router, private cookies:CookieService) {}

  token:string | undefined;

  login(email:string, password:string){
    // Verifica si el usuario existe antes de intentar iniciar sesión
    firebase.auth().fetchSignInMethodsForEmail(email)
    .then(
        (signInMethods: string[]) => {
            if (signInMethods.length === 0) {
                console.log(`El usuario con email ${email} no existe en la base de datos`);
                alert(`El usuario con email ${email} no existe en la base de datos`);
                throw new Error('El usuario no existe');
            } else {
                return firebase.auth().signInWithEmailAndPassword(email, password);
            }
        }
    )
    .then(
        response=>{
            firebase.auth().currentUser?.getIdToken().then(
                token=>{
                    this.token=token;
                    this.cookies.set("token", this.token);
                    this.router.navigate(['/']);
                }
            )
        }
    )
    .catch(
        error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`Error code: ${errorCode}, Error message: ${errorMessage}`);
            alert(`La contraseña es incorrecta`);
            throw new Error('Contraseña incorrecta');
        }
    );
}



  getIdToken(){
    //return this.token;
    return this.cookies.get("token");
  }

  estaLogueado(){
    //return this.token;
    return this.cookies.get("token");
  }

  logout(){
    firebase.auth().signOut().then(()=>{
      this.token="";
      this.cookies.set("token", this.token);
      this.router.navigate(['/']).then(()=> {window.location.reload();});
    });
  }
}