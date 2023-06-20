import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FormService } from './form.service';


@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent {
  dirMPAS: string | undefined;
  dirWPS: string | undefined;
  dirCasos: string | undefined;
  dirCaso: string | undefined;
  fecha: string | undefined;
  hora: string | undefined;
  duracion: string | undefined;
  dirGEO: string | undefined;

constructor(private router: Router, private formService: FormService){}

ngOnInit() {
    // Cuando el componente se inicializa, obtén los datos del formulario del servicio
    const data = this.formService.getData();

    // Rellena los campos del formulario con los datos obtenidos
    this.dirMPAS = data.dirMPAS;
    this.dirWPS = data.dirWPS;
    this.dirCasos = data.dirCasos;
    this.dirCaso = data.dirCaso;
    this.fecha = data.fecha;
    this.hora = data.hora;
    this.duracion = data.duracion;
    this.dirGEO = data.dirGEO;
}


goToComprobacion() {
    const formatoFecha = /^\d{4}-\d{2}-\d{2}$/;  // Formato yyyy-mm-dd
    const formatoHora = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;  // Formato hh:mm:ss

    if (!this.dirMPAS) {
        alert('Por favor, rellene el campo "Directorio donde está instalado MPAS".');
        return;
    }

    if (!this.dirWPS) {
        alert('Por favor, rellene el campo "Directorio donde está instalado WPS".');
        return;
    }

    if (!this.dirCasos) {
        alert('Por favor, rellene el campo "Directorio de casos para MPAS".');
        return;
    }

    if (!this.dirCaso) {
        alert('Por favor, rellene el campo "Directorio del caso concreto para MPAS".');
        return;
    }

    if (!this.fecha || !formatoFecha.test(this.fecha)) {
        alert('Por favor, rellene el campo "Fecha de comienzo de la simulación" con el formato correcto (yyyy-mm-dd).');
        return;
    } else {
        const año = +this.fecha.split('-')[0];
        const mes = +this.fecha.split('-')[1];
        const dia = +this.fecha.split('-')[2];
        
        if (mes < 1 || mes > 12) {
            alert('El mes de la fecha de comienzo de la simulación debe estar entre 1 y 12.');
            return;
        }

        let maxDia = 31;
        if (mes === 4 || mes === 6 || mes === 9 || mes === 11) {
            maxDia = 30;
        } else if (mes === 2) {
            // Comprobamos si el año es bisiesto
            if ((año % 4 === 0 && año % 100 !== 0) || año % 400 === 0) {
                maxDia = 29;
            } else {
                maxDia = 28;
            }
        }

        if (dia < 1 || dia > maxDia) {
            alert(`El día de la fecha de comienzo de la simulación debe estar entre 1 y ${maxDia} para el mes ${mes}.`);
            return;
        }
    }

    if (!this.hora || !formatoHora.test(this.hora)) {
        alert('Por favor, rellene el campo "Hora de comienzo de la simulación" con el formato correcto (hh:mm:ss).');
        return;
    }

    if (!this.duracion) {
        alert('Por favor, rellene el campo "Número de horas de la simulación".');
        return;
    }

    if (!this.dirGEO) {
        alert('Por favor, rellene el campo "Directorio de datos geográficos".');
        return;
    }

    this.formService.setData({
        dirMPAS: this.dirMPAS,
        dirWPS: this.dirWPS,
        dirCasos: this.dirCasos,
        dirCaso: this.dirCaso,
        fecha: this.fecha,
        hora: this.hora,
        duracion: this.duracion,
        dirGEO: this.dirGEO
    });

    let navigationExtras: NavigationExtras = {
      queryParams: {
          'dirMPAS': this.dirMPAS,
          'dirWPS': this.dirWPS,
          'dirCasos': this.dirCasos,
          'dirCaso': this.dirCaso,
          'fecha': this.fecha,
          'hora': this.hora,
          'duracion': this.duracion,
          'dirGEO': this.dirGEO
      }
  };

  this.router.navigate(['/comprobacion'], navigationExtras);

}

}

