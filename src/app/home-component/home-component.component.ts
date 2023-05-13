import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent {
  title = 'Tecnología MPAS';

  constructor(public loginService: LoginService, private router: Router) {}

  irAMallas() {
    this.router.navigate(['/mallas']);
  }
  

}
