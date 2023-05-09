import { Injectable } from '@angular/core';
import { DataServices } from './data.service';
import { MallaComponent } from './malla/malla.component';
import { DatosPrueba } from './datosPrueba.model';

@Injectable({
  providedIn: 'root'
})
export class MallaServiceService {

  constructor(private dataService:DataServices) { }

  datos:DatosPrueba[]=[
    new DatosPrueba("malla 1", "asas"),
    new DatosPrueba("malla 2", "assdsds"),

  ];

  agregarDatosBBDD(dato:DatosPrueba){
    //this.datos.push(dato);
    this.dataService.guardarDatos(this.datos);
  }
}
