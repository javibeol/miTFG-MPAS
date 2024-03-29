import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MallasComponent } from './mallas/mallas.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { ContactoComponentComponent } from './contacto-component/contacto-component.component';
import { QuienesSomosComponentComponent } from './quienes-somos-component/quienes-somos-component.component';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPersonalizadoComponentComponent } from './error-personalizado-component/error-personalizado-component.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { LoginGuardian } from './login/login-guardian';
import { RegisterComponent } from './register/register.component';
import { MallaService } from './mallas/malla.service';
import { NextPageComponent } from './next-page/next-page.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { ComprobacionComponent } from './comprobacion/comprobacion.component';
import { FormService } from './first-page/form.service';
import { LastPageComponent } from './last-page/last-page.component';

const appRoutes:Routes=[
  {path:'', component:HomeComponentComponent},
  {path:'contacto', component:ContactoComponentComponent, canActivate:[LoginGuardian]},
  {path:'mallas', component:MallasComponent, canActivate:[LoginGuardian]},
  {path:'quienes', component:QuienesSomosComponentComponent},
  {path:'login', component:LoginComponent},
  {path:'registro', component:RegisterComponent},
  {path:'first', component:FirstPageComponent, canActivate:[LoginGuardian]},
  {path:'next', component:NextPageComponent, canActivate:[LoginGuardian]},
  {path:'comprobacion', component:ComprobacionComponent, canActivate:[LoginGuardian]},
  {path:'last', component:LastPageComponent, canActivate:[LoginGuardian]},
  {path:'**', component:ErrorPersonalizadoComponentComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MallasComponent,
    HomeComponentComponent,
    ContactoComponentComponent,
    QuienesSomosComponentComponent,
    ErrorPersonalizadoComponentComponent,
    LoginComponent,
    RegisterComponent,
    NextPageComponent,
    FirstPageComponent,
    ComprobacionComponent,
    LastPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
  ],
  providers: [LoginService, CookieService, LoginGuardian, MallaService, FormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
