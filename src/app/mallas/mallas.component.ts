import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MallaService } from './malla.service';

@Component({
  selector: 'app-mallas',
  templateUrl: './mallas.component.html',
  styleUrls: ['./mallas.component.css']
})
export class MallasComponent implements OnInit{
  selectedUniformeMesh: string = '';
  selectedMesh: string = '';
  
  latitud: string | undefined;
  longitud: string | undefined;

  latitudMin: number = -90;
  latitudMax: number = 90;
  longitudMin: number = -180;
  longitudMax: number = 180;
  latitudErrorMessage: string = 'El valor debe estar entre el rango de -90 a 90';
  longitudErrorMessage: string = 'El valor debe estar entre el rango de -180 a 180';
  
  constructor(private router: Router, private mallaService: MallaService){}
  
  ngOnInit() {
    this.selectedUniformeMesh = this.mallaService.getSelectedUniformeMesh();
    this.selectedMesh = this.mallaService.getSelectedMesh();
  }

  selectImage(option: string) {
    this.selectedMesh = option;
    this.mallaService.setSelectedMesh(option);
  }

  goToNextPageUniforme() {
    if (this.selectedUniformeMesh) {
      const selectedLabel = (<HTMLInputElement>document.querySelector('input[name="mesh-U"]:checked')).getAttribute('data-label');
      const queryParams = {
        nombre: this.selectedUniformeMesh,
        label: selectedLabel,
        latitud: 0,
        longitud: 0
      };
      this.router.navigate(['/next'], { queryParams: queryParams });
      //this.router.navigate(['/next'], { queryParams: { nombre: this.selectedUniformeMesh } });
    } else {
      alert('Debes seleccionar una malla uniforme antes de continuar.');
    }
  }

  goToNextPage() {
    if (!this.selectedMesh) {
      alert('Debes seleccionar una malla variable antes de continuar.');
    } else if (!this.latitud) {
      alert('Debes ingresar la latitud antes de continuar.');
    } else if (!this.longitud) {
      alert('Debes ingresar la longitud antes de continuar.');
    } else {
      const selectedLabel = (<HTMLInputElement>document.querySelector('input[name="mesh"]:checked')).getAttribute('data-label');
      const imageSrc = (<HTMLImageElement>document.querySelector('input[name="mesh"]:checked + .form-check-label img')).src;
      const queryParams = {
        nombre: this.selectedMesh,
        label: selectedLabel,
        src: imageSrc,
        latitud: this.latitud,
        longitud: this.longitud
      };
      this.router.navigate(['/next'], { queryParams: queryParams });
    }
  }


validateLatitud() {
  const latitud = Number(this.latitud);
  if (isNaN(latitud) || latitud < this.latitudMin || latitud > this.latitudMax) {
    this.latitudErrorMessage = 'La latitud debe estar en el rango de -90 a 90.';
  } else {
    this.latitudErrorMessage = '';
  }
}

validateLongitud() {
  const longitud = Number(this.longitud);
  if (isNaN(longitud) || longitud < this.longitudMin || longitud > this.longitudMax) {
    this.longitudErrorMessage = 'La longitud debe estar en el rango de -180 a 180.';
  } else {
    this.longitudErrorMessage = '';
  }
}

  
  
}
