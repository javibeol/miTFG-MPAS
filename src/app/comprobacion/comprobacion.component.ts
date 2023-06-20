import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-comprobacion',
  templateUrl: './comprobacion.component.html',
  styleUrls: ['./comprobacion.component.css']
})
export class ComprobacionComponent implements OnInit {
  dirMPAS: string | undefined;
  dirWPS: string | undefined;
  dirCasos: string | undefined;
  dirCaso: string | undefined;
  fecha: string | undefined;
  hora: string | undefined;
  duracion: string | undefined;
  dirGEO: string | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private location: Location) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.dirMPAS = params['dirMPAS'];
      this.dirWPS = params['dirWPS'];
      this.dirCasos = params['dirCasos'];
      this.dirCaso = params['dirCaso'];
      this.fecha = params['fecha'];
      this.hora = params['hora'];
      this.duracion = params['duracion'];
      this.dirGEO = params['dirGEO'];
    });
  }

  goToMallas(): void {
    // Aquí puedes hacer lo que necesites con los parámetros y luego redirigir a /mallas
    this.router.navigate(['/mallas'], { queryParams: this.route.snapshot.queryParams });
  }

  goBack() {
    this.location.back();
  }
  

}

